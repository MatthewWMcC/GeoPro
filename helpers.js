const getRoom = (io, roomId) => {
  return io.sockets.adapter.rooms.get(roomId) || null;
};

module.exports = {
  getRoom,
};
