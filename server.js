const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.use(express.static('dist'));

const server = app.listen(port, () => {
    console.log("server is running on port " + port)
});

const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
});

io.sockets.on("connection", (socket) => {
    console.log("new user");
    socket.emit("connection-event", "hello")
    socket.on("message", data => console.log(data))
    socket.on("set-username", username => {
        socket.username = username;
        console.log(username)
    })
    socket.on("set-user-id", userId => socket.userId = userId)
    socket.on("join-room", async(roomId) => {

        await socket.join(roomId)
        let room = io.sockets.adapter.rooms.get(roomId)
        if (room.size === 1) {
            io.sockets.adapter.rooms.get(roomId).inGame = false;
            io.sockets.adapter.rooms.get(roomId).admin = socket.id;
            io.sockets.adapter.rooms.get(roomId).roomId = roomId;
            io.sockets.adapter.rooms.get(roomId).playerList = [];
        }
        
        const playerData = io.sockets.sockets.get(socket.id);
        const playerList = [...io.sockets.adapter.rooms.get(roomId).playerList];

        const compactedPlayerData = {
            socketId: playerData.id,
            username: playerData.username,
            userId: playerData.userId,
        }

        playerList.push(compactedPlayerData)
        
        io.sockets.adapter.rooms.get(roomId).playerList = playerList;

        socket.roomId = roomId;
        socket.emit("joined-new-game-data", io.sockets.adapter.rooms.get(roomId))
        socket.to(roomId).emit("new-player", compactedPlayerData);
    })
    socket.on("start-game", (roomId) => {
        io.sockets.adapter.rooms.get(roomId).inGame = true;
        io.in(roomId).emit("change-in-game-state", true);
    })
    socket.on("leave-game", (roomId) => {
        const newPlayerList = io.sockets.adapter.rooms.get(roomId).playerList.filter(player => player.socketId !== socket.id)
        io.sockets.adapter.rooms.get(roomId).playerList = [...newPlayerList]
        io.in(roomId).emit("player-left", socket.id)
        socket.leave(roomId)
    })
    socket.on("disconnect", () => {
        if(io.sockets.adapter.rooms.get(socket.roomId)){
            const newPlayerList = io.sockets.adapter.rooms.get(socket.roomId).playerList.filter(player => player.socketId !== socket.id)
            io.sockets.adapter.rooms.get(socket.roomId).playerList = [...newPlayerList]
            io.in(socket.roomId).emit("player-left", socket.id)
            socket.leave(socket.roomId)
        }
    })
})
