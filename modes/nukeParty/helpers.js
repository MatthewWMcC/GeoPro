const cloneDeep = require("lodash.clonedeep");
const EventEmitter = require("events");
const fs = require("fs");
const {
  initNukePartyData,
  initNukePartyPlayerData,
  GameViewStates,
  nukeStatus,
  guessStatus,
} = require("../../constants");
const { getRoom, delay, getPlayer } = require("../../helpers");
const fetch = require("node-fetch");

const startNewNukePartyRoom = (io, socket, roomId) => {
  let room = getRoom(io, roomId);

  nukePartyAddPlayer(io, socket, roomId);

  room.data = {
    ...cloneDeep(initNukePartyData),
    ...room.data,
  };
  socket.emit(
    "started-new-nuke-party-data",
    getNukePartyPublicData(io, roomId)
  );
};

const joinNukePartyRoom = (io, socket, roomId) => {
  nukePartyAddPlayer(io, socket, roomId);

  socket.emit("joined-nuke-game-data", getNukePartyPublicData(io, roomId));
  socket
    .to(roomId)
    .emit(
      "new-player",
      getNukePartyPlayerPublicData(io, roomId, socket.userId)
    ); //send whole player list
};

const nukePartyAddPlayer = (io, socket, roomId) => {
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
    ...cloneDeep(initNukePartyPlayerData),
  };

  playerList.push(newPlayerData);

  room.data.playerList = playerList;
};

const startNukeParty = async (io, roomId) => {
  let room = getRoom(io, roomId);
  if (room.data.playerList.length <= 1) {
    return;
  }
  room.data.viewState = GameViewStates.IN_GAME;
  newGameSetup(io, roomId);
  io.in(roomId).emit(
    "started-nuke-party",
    room.data.viewState,
    initNukePartyPlayerData.lives
  );
  room.data.nukeCountdown = room.data.maxNukeCountdown;

  await fillQuestionsQueue(io, roomId);

  for (let i of [3, 2, 1]) {
    io.in(roomId).emit("overlay-countdown-update", i);
    await delay(1000);
  }
  io.in(roomId).emit("overlay-countdown-update", null);

  while (
    room.data.playerList.filter((player) => player.lives > 0).length >= 2
  ) {
    for (let i = 0; i < room.data.playerList.length; i++) {
      if (!getRoom(io, roomId)) return;
      if (!room.data.playerList[i]) return;
      if (room.data.playerList[i].lives <= 0) continue;
      if (room.data.playerList.filter((player) => player.lives > 0).length < 1)
        break;
      room.data.currentTurnId = room.data.playerList[i].userId;
      room.data.nukeStatus = nukeStatus.GREEN;
      io.in(roomId).emit("new-nuke-round", room.data.currentTurnId);
      setPrompt(io, roomId);
      io.in(roomId).emit("emit-new-question", {
        question: room.data.prompt.question,
        imageSrc: room.data.prompt.imageSrc,
      });

      await runTurn(io, roomId);
      console.log("round over");
      room.data.correct = false;
    }
  }

  io.in(roomId).emit("nuke-party-over");

  console.log("game over");
};

const newGameSetup = (io, roomId) => {
  let room = getRoom(io, roomId);

  room.data.playerList = room.data.playerList.map((player) => {
    return {
      ...player,
      lives: initNukePartyPlayerData.lives,
    };
  });
};

const runTurn = async (io, roomId) => {
  let room = getRoom(io, roomId);
  let i = room.data.maxSafeCountdown * 10;
  let j = room.data.nukeCountdown * 10;

  while (i > 0 || j >= 0) {
    await delay(100);
    if (!getRoom(io, roomId)) return;
    if (!getPlayer(io, roomId, room.data.currentTurnId)) {
      return;
    }
    if (room.data.correct) {
      console.log("correct");
      break;
    }

    if (i > 0) {
      i--;
    } else {
      j--;
      const nukeStatus = getNukeStatus(j, room.data.maxNukeCountdown);
      if (nukeStatus !== room.data.nukeStatus) {
        room.data.nukeStatus = nukeStatus;
        io.in(roomId).emit("set-nuke-status", room.data.nukeStatus);
      }
    }
  }
  if (room.data.queue.length <= 0) {
    console.log("filling");
    await fillQuestionsQueue(io, roomId);
  }
  if (j <= 0) {
    //player ran out of time and loses a life
    room.data.playerList.forEach((player) => {
      if (player.userId === room.data.currentTurnId) {
        player.lives--;
        io.in(roomId).emit(
          "set-lives-value",
          room.data.currentTurnId,
          player.lives
        );
      }
    });
    room.data.nukeCountdown = room.data.maxNukeCountdown;
    await delay(2000);
  } else {
    room.data.nukeCountdown = Math.floor(j / 10);
  }
  return;
};

const getNukeStatus = (nukeTimer, maxNukeCountdown) => {
  maxNukeCountdown = maxNukeCountdown * 10;
  if (nukeTimer > maxNukeCountdown) {
  } else if (
    nukeTimer <= maxNukeCountdown &&
    nukeTimer > (maxNukeCountdown * 2) / 3
  ) {
    return nukeStatus.YELLOW;
  } else if (
    nukeTimer <= (maxNukeCountdown * 2) / 3 &&
    nukeTimer > maxNukeCountdown / 3
  ) {
    return nukeStatus.ORANGE;
  } else if (nukeTimer <= maxNukeCountdown / 3 && nukeTimer > 0) {
    return nukeStatus.RED;
  } else {
    return nukeStatus.EXPLODED;
  }
};

const makeGuess = async (io, socket, guess) => {
  const room = getRoom(io, socket.roomId);
  if (socket.userId === room.data.currentTurnId) {
    if (room.data.prompt.answers.includes(guess)) {
      room.data.queue = room.data.queue.filter((prompt) => {
        prompt.answers = prompt.answers.filter((answer) => answer !== guess);
        if (prompt.answers.length <= 0) {
          return false;
        }
        return true;
      });
      room.data.usedCountries.push(guess);
      room.data.correct = true;
      io.in(socket.roomId).emit("update-guess-status", guessStatus.CORRECT);
    } else if (room.data.usedCountries.includes(guess)) {
      console.log("duplicate");
      io.in(socket.roomId).emit("update-guess-status", guessStatus.DUPLICATE);
    } else {
      console.log("wrong");
      io.in(socket.roomId).emit("update-guess-status", guessStatus.WRONG);
    }

    await delay(1000);

    io.in(socket.roomId).emit("can-guess", true);
  }
};

const setupBeforeNukePartyStart = (io, roomId) => {};

const getNukePartyPublicData = (io, roomId) => {
  let room = getRoom(io, roomId);

  return {
    ...room.data,
  };
};

const getNukePartyPlayerPublicData = (io, roomId, userId) => {
  let room = getRoom(io, roomId);
  const { playerList } = room.data;

  const player = playerList.find((player) => player.userId === userId);

  return {
    ...player,
  };
};

const fillQuestionsQueue = async (io, roomId) => {
  let room = getRoom(io, roomId);
  const dataToAdd = [
    // "https://storage.googleapis.com/geopro-324602.appspot.com/data/4-letter-name-data.json",
    // "https://storage.googleapis.com/geopro-324602.appspot.com/data/start-3-letter-name-data.json",
    "https://storage.googleapis.com/geopro-324602.appspot.com/data/start-2-letter-name-data.json",
    "https://storage.googleapis.com/geopro-324602.appspot.com/data/flag-data.json",
  ];
  let [...val1] = await Promise.all([
    ...dataToAdd.map((bucket) => getDataTask(bucket, room.data.usedCountries)),
  ]);
  val1 = [].concat(...val1);

  val1.sort(() => 0.5 - Math.random());

  room.data.queue.push(...val1);
  return;
};

const getDataTask = (url, usedCountries) => {
  return new Promise((resolve, reject) => {
    const val = fetch(url)
      .then((response) => response.json())
      .then((json) => json.sort(() => 0.5 - Math.random()))
      .then((randomList) => {
        let tempList = [];
        for (let i = 0; i < randomList.length; i++) {
          randomList[i].answers = randomList[i].answers.filter(
            (answer) => !usedCountries.includes(answer)
          );
          if (randomList[i].answers.length > 0) {
            tempList.push(randomList[i]);
            if (tempList.length >= 20) {
              break;
            }
          }
        }
        return tempList;
      });
    resolve(val);
  });
};

const setPrompt = (io, roomId) => {
  let room = getRoom(io, roomId);
  room.data.prompt = room.data.queue.shift();
};

module.exports = {
  getNukePartyPublicData,
  getNukePartyPlayerPublicData,
  startNukeParty,
  startNewNukePartyRoom,
  joinNukePartyRoom,
  makeGuess,
};
