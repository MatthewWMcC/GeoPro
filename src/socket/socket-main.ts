import socketIOClient from "socket.io-client";
import { AddPlayer, DeletePlayer, InGameChange, InitGameData, SetLocationHeaderData, UpdateCountdown, UpdateLoadingHeader, UpdateRoundNumber } from "state/GameData/actions";
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
    store.dispatch(UpdateLoadingHeader(false));
    store.dispatch(SetLocationHeaderData(data))
})

socket.on('update-round-number', roundNumber => {
    store.dispatch(UpdateRoundNumber(roundNumber));
})

socket.on("update-countdown", countdown => {
    store.dispatch(UpdateCountdown(countdown));
})

socket.on("loading-header", loading =>{
    store.dispatch(UpdateLoadingHeader(loading));
})