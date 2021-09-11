const { getRoom } = require("../../helpers");

const nukePartyEvents = (io, socket) => {
  socket.on("test-event", () => {
    // socket.emit("connection-event", "test event passed");
  });

  socket.on("nuke-party-guess", (guess) => {
    let room = getRoom(io, socket.roomId);

    if (socket.userId === room.data.currentTurnId) {
      console.log(guess);
      if (room.data.prompt.answers.includes(guess)) {
        console.log("right");
      } else {
        console.log("wrong");
      }
    }
  });
};

module.exports = nukePartyEvents;
