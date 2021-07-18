const express = require("express");
const geolib = require('geolib');
const app = express();
const convertLocationDataForGeolib = require('./serverHelpers/helper-functions').convertLocationDataForGeolib

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
        const initServerClientData = {
            inGame: false,
            admin: "",
            roomId: roomId,
            playerList: [],
            roundNumber: 0,
            maxRound: 10,
            locationData: {},
            countdown: 0,
            maxCountdown: 20,
            loadingHeader: true,
            guessLimit: 3,
            numberOfLocationResults: await getNumberOfLocationResults(),
            resultsToChooseFrom: 5,
        }

        await socket.join(roomId)
        let room = getRoom(roomId)
        if (room.size === 1) {
            room.data = initServerClientData;
            room.data.admin = socket.userId;
        }
        
        const playerData = io.sockets.sockets.get(socket.id);
        const playerList = [...room.data.playerList];

        const newPlayerData = {
            socketId: playerData.id,
            username: playerData.username,
            userId: playerData.userId,
            score: 0,
            guessNum: room.data.guessLimit,
            guess: null,
            distance: null,
        }

        playerList.push(newPlayerData);
    
        room.data.playerList = playerList;

        socket.roomId = roomId;
        socket.emit("joined-new-game-data", getPublicData(roomId))

        const {guess, distance, ...viewablePlayerData} = newPlayerData
        socket.to(roomId).emit("new-player", {...viewablePlayerData});

    })
    socket.on("update-num-of-top-results", (roomId, num) => {
        const room = getRoom(roomId)
        if(room && socket.userId === room.data.admin){
            room.data.resultsToChooseFrom = num;
            io.in(roomId).emit("updated-results-to-choose", num);
        }
    })
    socket.on("update-max-countdown", (roomId, maxCountdown) => {
        const room = getRoom(roomId)
        if(room && socket.userId === room.data.admin){
            room.data.maxCountdown = maxCountdown;
            io.in(roomId).emit("updated-max-countdown", maxCountdown);
        }
    })
    socket.on("update-guess-limit", (roomId, guessLimit) => {
        const room = getRoom(roomId)
        if(room && socket.userId === room.data.admin){
            room.data.guessLimit = guessLimit;
            io.in(roomId).emit("updated-guess-limit", guessLimit);
        }
    })
    socket.on("start-game", (roomId) => {
        const room = getRoom(roomId)
        if(room && socket.userId === room.data.admin){
            startGame(roomId);
        }
    })
    socket.on("leave-game", () => {
        console.log("leave")
        handleLeave() 
    })
    socket.on("disconnect", () => {
        console.log("dis")
        handleLeave()
    })
    socket.on("player-location-guess", (newGuessMade) => {
        const room = getRoom(socket.roomId);
        console.log(newGuessMade)
        
        const { playerData } = getPlayerDataFromRoom(socket.id, socket.roomId);
        const { guess, distance, guessNum, ...restOfPlayerData } = playerData;

        if(isGuessAllowed(newGuessMade, guessNum)){ 
            console.log("guessAllowed")
            const {lat, lng} = room.data.locationData;

            const newDistance = getDistance({lat, lng}, convertLocationDataForGeolib(newGuessMade))
            const isNewDistanceCloser = newDistance < distance || !distance

        
            const playerData = {
                guessNum: guessNum - 1,
                distance: isNewDistanceCloser ? newDistance : distance,
                guess: isNewDistanceCloser ? newGuessMade: guess
            }
            setPlayerData(socket.id, socket.roomId, playerData);
            io.in(socket.roomId).emit('updated-guessnum', socket.userId, playerData.guessNum);
            if(isNewDistanceCloser) {
                socket.emit("updated-best-guess", playerData.guess);
            }

        } 
    })

    const startGame = async(roomId) => {
        const room = getRoom(roomId);

        room.data.inGame = true;
        io.in(roomId).emit("change-in-game-state", true);

        room.data.roundNumber = 0;
        io.in(roomId).emit('update-round-number', room.data.roundNumber)
    
        for(let i = 1; i <= room.data.maxRound; i++){
            room.data.playerList = clearPrivatePlayerData(roomId);

            room.data.loadingHeader = true;

            room.data.countdown = room.data.maxCountdown;

            room.data.roundNumber = i;

            io.in(roomId).emit('new-round', {
                guessNum: room.data.guessLimit,
                countdown: room.data.countdown,
                roundNumber: room.data.roundNumber,
            });

            const locationData = await getRandomLocationData(room.data.numberOfLocationResults, room.data.resultsToChooseFrom);
            room.data.locationData = locationData;

            room.data.loadingHeader = false;
            io.in(roomId).emit('update-location-header-data', getClientLocationData(roomId));
    
            while(room.data.countdown > 0){
                await delay(1000);
                if(!room) return;
                if(!getValueFromRoom(roomId, "inGame")) return;

                room.data.countdown--;
                io.in(roomId).emit('update-countdown', room.data.countdown)
            }
        }
    }

    const isGuessAllowed = (newGuessMade, guessNum) => {
        if (guessNum <= 0) return false;
        if (!newGuessMade) return false;
        return true;
    }

    const handleLeave = () => {
        socket.leave(socket.roomId)
        const room = getRoom(socket.roomId);
        if(room){
            console.log("a player has left")
            room.data.playerList = room.data.playerList.filter(player => player.socketId !== socket.id)
            io.in(socket.roomId).emit("player-left", socket.id)

            if(socket.userId === room.data.admin && room?.data?.playerList[0]) {
                room.data.admin = room.data.playerList[0].userId;
            }
        }
    }
  
})

async function delay(ms) {
    return await new Promise(resolve => setTimeout(resolve, ms));
}

const getRoom = (roomId) => {
    return io.sockets.adapter.rooms.get(roomId)
}

const getDistance = (actualPosition, newGuess) => {
    return geolib.getDistance(
        actualPosition,
        newGuess
    )
}

const getPublicData = (roomId) => {
    const room = getRoom(roomId);
    const { data } = room;
    const { playerList, locationData, numberOfLocationResults, ...leftoverData} = data;
    return {
        ...leftoverData,
        playerList: playerList.map(player => {
            const { guess, distance, ...leftoverPlayer} = player
            return {
                ...leftoverPlayer
            }
        }),
        locationHeaderData: {
            city: locationData.city,
            region: locationData.region,
            country: locationData.country,
        }
    }
}

const getClientLocationData = (roomId) => {
    const room = getRoom(roomId);
    const { locationData } = room.data;
    const { lng, lat, ...clientData} = locationData
    return {
        ...clientData
    }
}

const getPlayerDataFromRoom = (socketId, roomId) => {
    const room = getRoom(roomId);
    const { playerList } = room.data;
    const i = playerList.findIndex(dataObject => dataObject.socketId === socketId);

    return { 
        playerData: playerList[i],
        index: i
    }
}

const getValueFromRoom = (roomId, key) => {
    const room = getRoom(roomId);
    return room ? room.data[key] : false;
}

const setPlayerData = (socketId, roomId, data) => {
    const room = getRoom(roomId);
    const { playerData, index } =  getPlayerDataFromRoom(socketId, roomId);
    room.data.playerList[index] = {
        ...playerData,
        ...data
    }
}

const clearPrivatePlayerData = (roomId) => {
    const room = getRoom(roomId);


    return room.data.playerList.map(playerData => {
        return({
            ...playerData,
            guess: null,
            guessNum: room.data.guessLimit,
            distance: null,
        })
    })
}