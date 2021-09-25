const { cloneDeep } = require("lodash");
const fs = require("fs");
const {
  initNukePartyData,
  initNukePartyPlayerData,
  GameViewStates,
  testDataNukeParty,
} = require("../../constants");
const { getRoom } = require("../../helpers");
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
  room.data.viewState = GameViewStates.IN_GAME;
  io.in(roomId).emit("started-nuke-party", room.data.viewState);
  await fillQuestionsQueue(io, roomId);
  let j = 0;
  // while (j < 20) {
  for (let i = 0; i < room.data.playerList.length; i++) {
    room.data.currentTurnId = room.data.playerList[i].userId;
    io.in(roomId).emit("new-nuke-round", room.data.currentTurnId);
    setPrompt(io, roomId);
    io.in(roomId).emit("emit-new-question", {
      question: room.data.prompt.question,
    });
  }
  j++;
  // }
};

const setupBeforeNukePartyStart = (io, roomId) => {};

const getNukePartyPublicData = (io, roomId) => {
  let room = getRoom(io, roomId);
  console.log(room.data);

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

  const content = await fetch(
    "https://storage.googleapis.com/geopro-324602.appspot.com/data/3-letter-name-data.json"
  )
    .then((response) => response.json())
    .then((json) => json.sort(() => 0.5 - Math.random()))
    .then((randomList) => {
      let tempList = [];
      for (let i = 0; i < randomList.length; i++) {
        randomList[i].answers = randomList[i].answers.filter(
          (answer) => !room.data.usedCountries.includes(answer)
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

  room.data.queue.push(...content);
  return;
};

// const fillQuestionsQueue = async (io, roomId) => {
//   let room = getRoom(io, roomId);

//   let randomList = testDataNukeParty.sort(() => 0.5 - Math.random());
//   let tempList = [];
//   for (let i = 0; i < randomList.length; i++) {
//     randomList[i].answers = randomList[i].answers.filter(
//       (answer) => !room.data.usedCountries.includes(answer)
//     );
//     if (randomList[i].answers.length > 0) {
//       tempList.push(randomList[i]);
//       if (tempList.length >= 5) {
//         break;
//       }
//     }
//   }

//   room.data.queue.push(...tempList);
// return;
// };

const setPrompt = (io, roomId) => {
  let room = getRoom(io, roomId);
  // val = val.filter((question) => {
  //   let countries = question.countries;
  //   countries = countries.filter((country) => !usedCountries.includes(country));
  //   if (countries.length > 0) {
  //     // question.countries = countries;
  //     return true;
  //   } else {
  //     return false;
  //   }
  // });
  room.data.prompt = room.data.queue.shift();
};

module.exports = {
  getNukePartyPublicData,
  getNukePartyPlayerPublicData,
  startNukeParty,
  startNewNukePartyRoom,
  joinNukePartyRoom,
};
