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
        let room = getRoom(roomId)
        if (room.size === 1) {
            getRoom(roomId).inGame = false;
            getRoom(roomId).admin = socket.id;
            getRoom(roomId).roomId = roomId;
            getRoom(roomId).playerList = [];
        }
        
        const playerData = io.sockets.sockets.get(socket.id);
        const playerList = [...getRoom(roomId).playerList];

        const compactedPlayerData = {
            socketId: playerData.id,
            username: playerData.username,
            userId: playerData.userId,
        }

        playerList.push(compactedPlayerData)
        
        getRoom(roomId).playerList = playerList;

        socket.roomId = roomId;
        socket.emit("joined-new-game-data", getRoom(roomId))

        socket.to(roomId).emit("new-player", compactedPlayerData);
    })
    socket.on("start-game", (roomId) => {
        getRoom(roomId).inGame = true;
        io.in(roomId).emit("change-in-game-state", true);
        socket.emit('update-location-header-data', getRandomLocation())
    })
    socket.on("leave-game ", (roomId) => {
        if(getRoom(socket.roomId)){
            const newPlayerList = getRoom(roomId).playerList.filter(player => player.socketId !== socket.id)
            getRoom(roomId).playerList = [...newPlayerList]
            io.in(roomId).emit("player-left", socket.id)
            socket.leave(roomId)
        }
        
    })
    socket.on("disconnect", () => {
        if(getRoom(socket.roomId)){
            const newPlayerList = getRoom(socket.roomId).playerList.filter(player => player.socketId !== socket.id)
            getRoom(socket.roomId).playerList = [...newPlayerList]
            io.in(socket.roomId).emit("player-left", socket.id)
            socket.leave(socket.roomId)
        }
    })
})

const getRoom = (roomId) => {
    return io.sockets.adapter.rooms.get(roomId)
}

const getRandomLocation = () => {
    const locationList = [
        {
            city: "Tehran",
            country: "Iran"
        }
    ]

    return locationList[0]
}