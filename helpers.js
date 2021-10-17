const getRoom = (io, roomId) => {
  return io.sockets.adapter.rooms.get(roomId) || null;
};

const getPlayer = (io, roomId, userId) => {
  return (
    io.sockets.adapter.rooms
      .get(roomId)
      .data.playerList.find((player) => player.userId === userId) || null
  );
};

async function delay(ms) {
  return await new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
  getRoom,
  getPlayer,
  delay,
};
