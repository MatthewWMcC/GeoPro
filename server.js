const express = require("express");
const geolib = require("geolib");
const path = require("path");
const app = express();
const uniqid = require("uniqid");
const convertLocationDataForGeolib =
  require("./serverHelpers/helper-functions").convertLocationDataForGeolib;

const cloneDeep = require("lodash.clonedeep");

const getNumberOfLocationResults =
  require("./serverHelpers/location-data-api-handler").getNumberOfLocationResults;
const getRandomLocationData =
  require("./serverHelpers/location-data-api-handler").getRandomLocationData;

const {
  initBaseGameData,
  initCapitalProData,
  gameType,
  capitialProViewStates,
  initCapitalProPlayerData,
  GameViewStates,
} = require("./constants");

const { getRoom, delay } = require("./helpers");
const nukePartyEvents = require(path.join(
  __dirname,
  "modes/nukeParty/socket-events"
));

const {
  startNukeParty,
  startNewNukePartyRoom,
  joinNukePartyRoom,
} = require(path.join(__dirname, "modes/nukeParty/helpers"));

const port = process.env.PORT || 8080;

app.use(express.static("dist"));

const server = app.listen(port, () => {
  console.log("server is running on port " + port);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.sockets.on("connection", (socket) => {
  nukePartyEvents(io, socket);
  console.log("new user");
  socket.emit("connection-event", "hello");
  socket.on("message", (data) => console.log(data));
  socket.on("set-player-data", ({ username, userIconSrc, userId }) => {
    socket.username = username;
    socket.userId = userId;
    socket.userIconSrc = userIconSrc;
  });
  socket.on("start-new-lobby", async (gameMode) => {
    const roomId = uniqid();
    await socket.join(roomId);
    var room = getRoom(io, roomId);
    room.data = cloneDeep(initBaseGameData);
    socket.roomId = roomId;
    room.data.admin = socket.userId;
    room.data.roomId = roomId;
    room.data.gameMode = gameMode;

    if (gameMode === gameType.CAPITAL_PRO) {
      addPlayer(roomId);
      room.data = {
        ...cloneDeep(initCapitalProData),
        ...room.data,
      };
      socket.emit("started-new-game-data", room.data);
    } else if (gameMode === gameType.NUKE_PARTY) {
      startNewNukePartyRoom(io, socket, roomId);
    }
  });
  socket.on("join-room", async (roomId) => {
    let room = getRoom(io, roomId);
    if (!room) socket.emit("no-room-found");
    else if (room.has(socket.id)) return;
    else {
      const playerIndex = room.data.playerList.findIndex(
        (player) => player.userId === socket.userId
      );
      if (playerIndex < 0) {
        await socket.join(roomId);
        socket.roomId = roomId;

        if (room.data.gameMode === gameType.CAPITAL_PRO) {
          addPlayer(roomId);
          socket.emit("joined-new-game-data", getPublicData(roomId));
          socket
            .to(roomId)
            .emit("new-player", getPublicPlayerData(roomId, socket.userId)); //send whole player list
        } else if (room.data.gameMode === gameType.NUKE_PARTY) {
          if (room.data.viewState === GameViewStates.IN_GAME) {
            socket.emit(
              "cannot-join",
              "Game has already started. Cannot join."
            );
            return;
          }
          joinNukePartyRoom(io, socket, roomId);
        }
      } else {
        socket.emit("duplicate-player");
      }
    }
  });
  socket.on("update-num-of-top-results", (roomId, num) => {
    let room = getRoom(io, roomId);
    if (room && socket.userId === room.data.admin) {
      setData(roomId, "resultsToChooseFrom", num);
      io.in(roomId).emit("updated-results-to-choose", num);
    }
  });
  socket.on("update-max-countdown", (roomId, maxCountdown) => {
    let room = getRoom(io, roomId);
    if (room && socket.userId === room.data.admin) {
      setData(roomId, "maxCountdown", maxCountdown);
      io.in(roomId).emit("updated-max-countdown", maxCountdown);
    }
  });
  socket.on("update-guess-limit", (roomId, guessLimit) => {
    let room = getRoom(io, roomId);
    if (room && socket.userId === room.data.admin) {
      setData(roomId, "guessLimit", guessLimit);
      io.in(roomId).emit("updated-guess-limit", guessLimit);
    }
  });
  socket.on("start-nuke-party-game", () => {
    const { roomId } = socket;
    if (roomId) {
      let room = getRoom(io, roomId);
      if (room && socket.userId === room.data.admin) {
        switch (room.data.gameMode) {
          case gameType.NUKE_PARTY:
            startNukeParty(io, roomId);
            break;
          default:
            startGame(roomId);
        }
      }
    }
  });
  socket.on("return-game-to-wait", () => {
    const roomId = socket.roomId;
    let room = getRoom(io, roomId);
    if (room && socket.userId === room.data.admin) {
      removeInGameData(roomId);
      io.in(roomId).emit("remove-game-data", {
        playerList: room.data.playerList,
        viewState: room.data.viewState,
      });
    }
  });
  socket.on("restart-game", () => {
    //ignore
    const roomId = socket.roomId;
    let room = getRoom(io, roomId);
    if (room && socket.userId === room.data.admin) {
      io.in(roomId).emit("joined-new-game-data", getPublicData(roomId));
      startGame(roomId);
    }
  });
  socket.on("leave-game", () => {
    console.log("leave");
    handleLeave();
  });
  socket.on("disconnect", () => {
    console.log("dis");
    handleLeave();
  });
  socket.on("player-location-guess", (roomId, newGuessMade) => {
    //refactor
    let room = getRoom(io, roomId);

    const playerData = getPlayerDataFromRoom(socket.userId, roomId);
    const { guess, distance, guessNum, ...restOfPlayerData } = playerData;

    if (isGuessAllowed(newGuessMade, guessNum)) {
      const { lat, lng } = room.data.locationData;

      const newDistance = getDistance(
        { lat, lng },
        convertLocationDataForGeolib(newGuessMade)
      );
      const isNewDistanceCloser = newDistance < distance || !distance;

      const playerData = {
        guessNum: guessNum - 1,
        distance: isNewDistanceCloser ? newDistance : distance,
        guess: isNewDistanceCloser ? newGuessMade : guess,
      };
      setPlayerData(roomId, socket.userId, playerData);
      io.in(socket.roomId).emit(
        "updated-guessnum",
        socket.userId,
        playerData.guessNum
      );
      if (isNewDistanceCloser) {
        socket.emit("updated-best-guess", playerData.guess);
      }
    }
  });

  const addPlayer = (roomId) => {
    let room = getRoom(io, roomId);
    const playerData = io.sockets.sockets.get(socket.id);
    const { playerList, gameMode } = room.data;

    if (!playerData?.id) return;

    let newPlayerData = {
      socketId: playerData.id,
      username: playerData.username,
      userId: playerData.userId,
      userIconSrc: playerData.userIconSrc,
    };

    newPlayerData = {
      ...newPlayerData,
      ...cloneDeep(initCapitalProPlayerData),
      guessNum: room.data.guessLimit,
    };

    playerList.push(newPlayerData);

    room.data.playerList = playerList;
  };

  const setupBeforeGameStart = (roomId) => {
    let room = getRoom(io, roomId);
    room.data.viewState = GameViewStates.IN_GAME;
    (room.data.playerList = room.data.playerList.map((player) => {
      return {
        ...player,
        score: 0,
        addedScore: 0,
        guess: undefined,
        distance: undefined,
        guessNum: room.data.guessLimit,
      };
    })),
      (room.data.locationData = {});
  };

  const startGame = async (roomId) => {
    let room = getRoom(io, roomId);
    setupBeforeGameStart(roomId); ///////start here
    io.in(roomId).emit("game-start-data", {
      viewState: room.data.viewState,
      playerList: room.data.playerList,
      locationData: room.data.locationData,
    });

    for (let i = 1; i <= room.data.maxRound; i++) {
      room.data.countdown = room.data.maxCountdown;
      room.data.roundNumber = i;
      room.data.locationData = {};
      setData(roomId, "viewState", GameViewStates.IN_GAME);
      updatePlayerGuessesForNewRound(roomId);

      io.in(roomId).emit("new-round", {
        guessNum: room.data.guessLimit,
        countdown: room.data.countdown,
        roundNumber: room.data.roundNumber,
        viewState: room.data.viewState,
        locationData: {},
      });

      const locationData = await getRandomLocationData(
        room.data.numberOfLocationResults,
        room.data.resultsToChooseFrom
      );
      room.data.locationData = locationData;
      io.in(roomId).emit("new-location", getClientLocationData(roomId));

      while (room.data.countdown > 0) {
        await delay(1000);
        if (!getRoom(io, roomId)) return;
        room.data.countdown--;
        io.in(roomId).emit("update-countdown", room.data.countdown);
      }

      updatePlayerScores(roomId);

      setData(roomId, "viewState", capitialProViewStates.ROUND_END_MODAL);
      setData(roomId, "roundEndCountdown", room.data.maxRoundEndCountdown);

      io.in(roomId).emit("round-end-modal-setup", {
        viewState: room.data.viewState,
        playerList: room.data.playerList,
        roundEndCountdown: room.data.maxRoundEndCountdown,
        roundEndLocationData: getRoundEndLocationData(roomId),
      });

      while (room.data.roundEndCountdown > 0) {
        await delay(1000);
        if (!getRoom(io, roomId)) return;
        // if(room.data.viewState !== capitialProViewStates.ROUND_END_MODAL) return;

        room.data.roundEndCountdown--;
        io.in(roomId).emit(
          "update-round-end-countdown",
          room.data.roundEndCountdown
        );
      }
    }
    setData(roomId, "viewState", capitialProViewStates.GAME_END);
    io.in(roomId).emit("game-end", room.data.viewState);
  };

  const isGuessAllowed = (newGuessMade, guessNum) => {
    if (guessNum <= 0) return false;
    if (!newGuessMade) return false;
    return true;
  };

  const handleLeave = () => {
    socket.leave(socket.roomId);
    let room = getRoom(io, socket.roomId);
    if (room) {
      console.log("a player has left");
      room.data.playerList = room.data.playerList.filter(
        (player) => player.socketId !== socket.id
      );
      io.in(socket.roomId).emit("player-left", socket.userId);

      if (socket.userId === room.data.admin && room?.data?.playerList[0]) {
        room.data.admin = room.data.playerList[0].userId;
      }
    }
  };
});

const getDistance = (actualPosition, newGuess) => {
  return geolib.getDistance(actualPosition, newGuess);
};

const getPublicPlayerData = (roomId, userId) => {
  let room = getRoom(io, roomId);
  const { playerList } = room.data;
  const roundInProgress = room.data.viewState === GameViewStates.IN_GAME;
  const player = playerList.find((player) => player.userId === userId);
  return {
    ...player,
    guess: !roundInProgress && player.guess,
    distance: !roundInProgress && player.distance,
  };
};

const getPublicData = (roomId) => {
  let room = getRoom(io, roomId);
  const { data } = room;
  const { playerList, locationData, numberOfLocationResults, ...leftoverData } =
    data;
  const roundInProgress = room.data.viewState === GameViewStates.IN_GAME;
  return {
    ...room.data,
    playerList: playerList.map((player) => {
      return {
        ...player,
        guess: !roundInProgress && player.guess,
        distance: !roundInProgress && player.distance,
      };
    }),
    locationData: {
      city: locationData.city,
      region: locationData.region,
      country: locationData.country,
      lnglat: !roundInProgress && {
        lng: locationData.lng,
        lat: locationData.lat,
      },
      wikiId: !roundInProgress && locationData.wikiId,
    },
  };
};

const updatePlayerGuessesForNewRound = (roomId) => {
  let room = getRoom(io, roomId);
  const { playerList } = room?.data;

  room.data.playerList = playerList.map((player) => {
    return {
      ...player,
      guessNum: room.data.guessLimit,
      guess: undefined,
      distance: undefined,
    };
  });
};

const setData = (roomId, key, val) => {
  let room = getRoom(io, roomId);
  if (!room) return;
  room.data[key] = val;
};

const getClientLocationData = (roomId) => {
  let room = getRoom(io, roomId);
  if (!room) return;
  const { locationData } = room.data;
  const { lng, lat, wikiId, ...clientData } = locationData;
  return {
    ...clientData,
  };
};

const getRoundEndLocationData = (roomId) => {
  const { locationData } = getRoom(io, roomId).data;
  const { lng, lat, wikiId } = locationData;
  return {
    lnglat: { lng, lat },
    wikiId,
  };
};

const getPlayerDataFromRoom = (userId, roomId) => {
  let room = getRoom(io, roomId);
  const { playerList } = room.data;
  const player = playerList.find((dataObject) => dataObject.userId === userId);

  return player;
};

const getValueFromRoom = (roomId, key) => {
  let room = getRoom(io, roomId);
  if (!room) return;
  return room.data[key];
};

const setPlayerData = (roomId, userId, playerData) => {
  let room = getRoom(io, roomId);
  room.data.playerList = room.data.playerList.map((player) => {
    if (player.userId === userId) {
      return {
        ...player,
        ...playerData,
      };
    } else return player;
  });
};

const updatePlayerScores = (roomId) => {
  let room = getRoom(io, roomId);
  room.data.playerList = room.data.playerList
    .map((player) => {
      const score = generateScore(player.distance);
      return {
        ...player,
        addedScore: score,
        score: player.score + score,
      };
    })
    .sort((a, b) => {
      if (a.score < b.score) {
        return 1;
      } else {
        return -1;
      }
    });
};

const removeInGameData = (roomId) => {
  let room = getRoom(io, roomId);
  room.data.viewState = GameViewStates.WAITING;
  (room.data.playerList = room.data.playerList.map((player) => {
    return {
      ...player,
      score: 0,
      addedScore: 0,
      guess: undefined,
      distance: undefined,
      guessNum: room.data.guessLimit,
    };
  })),
    (room.data.locationData = {});
  room.data.roundNumber = 0;
};

const generateScore = (distance) => {
  if (!distance) return 0;
  const val = Math.ceil(
    1000 * Math.exp((-1 / 800) * (distance - 20000) ** 0.5)
  );
  return !!val && val <= 1000 ? val : 1000;
};
