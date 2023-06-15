const { getRoom } = require("../../helpers");
const { makeGuess } = require("./helpers");

const nukePartyEvents = (io, socket) => {
  socket.on("nuke-party-guess", (guess) => {
    let room = getRoom(io, socket.roomId);

    makeGuess(io, socket, guess);
  });

  socket.on("select-country", (country) => {
    io.in(socket.roomId).emit("country-selected", country);
  });
};

module.exports = nukePartyEvents;
