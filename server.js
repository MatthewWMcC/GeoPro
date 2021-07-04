const express = require("express");
const app = express();

const getNumberOfLocationResults = require('./serverHelpers/location-data-api-handler').getNumberOfLocationResults;
const getRandomLocationData = require('./serverHelpers/location-data-api-handler').getRandomLocationData;


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
            room.clientData = {}
            room.serverData = {}

            room.clientData.inGame = false;
            room.clientData.admin = socket.id;
            room.clientData.roomId = roomId;
            room.clientData.playerList = [];
            room.clientData.roundNumber = 0;
            room.clientData.maxRound = 10;
            room.clientData.locationHeaderData = {};
            room.clientData.countdown = 0;
            room.clientData.maxCountdown = 10;

            room.serverData.numberOfLocationResults = await getNumberOfLocationResults();
        }
        
        const playerData = io.sockets.sockets.get(socket.id);
        const playerList = [...getRoom(roomId).clientData.playerList];

        const compactedPlayerData = {
            socketId: playerData.id,
            username: playerData.username,
            userId: playerData.userId,
        }

        playerList.push(compactedPlayerData)
        
        getRoom(roomId).clientData.playerList = playerList;

        socket.roomId = roomId;
        socket.emit("joined-new-game-data", getRoom(roomId).clientData)

        socket.to(roomId).emit("new-player", compactedPlayerData);
    })
    socket.on("start-game", (roomId) => {
        getRoom(roomId).clientData.inGame = true;
        io.in(roomId).emit("change-in-game-state", true);
        startGame(roomId);
    })
    socket.on("leave-game", () => {
        console.log("leave")
        handleLeave()
        
    })
    socket.on("disconnect", () => {
        console.log("dis")
        handleLeave()
    })

    const startGame = async(roomId) => {
        const room = getRoom(roomId);

        room.clientData.roundNumber = 0;
    
        for(let i = 1; i <= room.clientData.maxRound; i++){
            room.clientData.locationHeaderData = await getRandomLocationData(room.serverData.numberOfLocationResults, room);
            io.in(roomId).emit('update-location-header-data', room.clientData.locationHeaderData)

            room.clientData.countdown = room.clientData.maxCountdown;
            io.in(roomId).emit('update-countdown', room.clientData.countdown)

            room.clientData.roundNumber = i;
            io.in(roomId).emit('update-round-number', room.clientData.roundNumber)
    
            while(room.clientData.countdown > 0){
                await delay(1000);
                if(getRoom(roomId) && !getRoom(roomId).clientData.inGame) return;
                if(!getRoom(roomId)) return;
                
                room.clientData.countdown--;
                io.in(roomId).emit('update-countdown', room.clientData.countdown)
            }
        }
    }

    const handleLeave = () => {
        socket.leave(socket.roomId)
        // console.log(getRoom(socket.roomId))
        if(getRoom(socket.roomId)){
            console.log("a player has left")
            const newPlayerList = getRoom(socket.roomId).clientData.playerList.filter(player => player.socketId !== socket.id)
            getRoom(socket.roomId).clientData.playerList = [...newPlayerList]
            io.in(socket.roomId).emit("player-left", socket.id)
        }
    }
})

async function delay(ms) {
    return await new Promise(resolve => setTimeout(resolve, ms));
}

const getRoom = (roomId) => {
    return io.sockets.adapter.rooms.get(roomId)
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
