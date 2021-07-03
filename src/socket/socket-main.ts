import socketIOClient from "socket.io-client";
import { AddPlayer, DeletePlayer, InGameChange, InitGameData, setLocationHeaderData } from "state/GameData/actions";
import { store } from "state/store";
const serverEndpoint = process.env.SERVER as string; 
export const socket = socketIOClient(serverEndpoint);

socket.on("connection-event", data => {
    console.log(data)
})

socket.on("joined-new-game-data", data => {
    store.dispatch(InitGameData(data));
})

socket.on("change-in-game-state", inGame => {
    store.dispatch(InGameChange(inGame));
})

socket.on("new-player", newPlayer => {
    store.dispatch(AddPlayer(newPlayer))
})

socket.on("player-left", socketId => {
    store.dispatch(DeletePlayer(socketId))
})

socket.on('update-location-header-data', data => {
    store.dispatch(setLocationHeaderData(data))
})