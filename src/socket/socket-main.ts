import socketIOClient from "socket.io-client";
import { changeShowRoundEndModal } from "state/currentPageData/actions";
import { AddPlayer, AddRoundEndLocationData, ClearLocationData, DeletePlayer, InGameChange, InitGameData, 
    SetLocationHeaderData, UpdateBaseGameSetting, UpdateBestMapGuess, UpdateCountdown, UpdateDataToAllPlayers, 
    UpdateLoadingHeader, UpdatePlayerGuessNum, UpdateResultsToChooseFrom, UpdateRoundEndCountdown, UpdateRoundEndPlayerData, 
    UpdateRoundNumber } from "state/GameData/actions";
import { store } from "state/store";
const serverEndpoint = process.env.SERVER as string; 
export const socket = socketIOClient(serverEndpoint);

socket.on("connection-event", data => {
    console.log(data);
})

socket.on("joined-new-game-data", data => {
    const {showRoundEndModal, ...restOfData} = data;
    store.dispatch(InitGameData(restOfData));
    store.dispatch(changeShowRoundEndModal(showRoundEndModal));
})

socket.on("change-in-game-state", inGame => {
    store.dispatch(InGameChange(inGame));
})

socket.on("new-player", newPlayer => {
    store.dispatch(AddPlayer(newPlayer));
})

socket.on("player-left", socketId => {
    store.dispatch(DeletePlayer(socketId));
})

socket.on('update-location-header-data', data => {
    store.dispatch(UpdateLoadingHeader(false));
    store.dispatch(SetLocationHeaderData(data));
})

socket.on('update-round-number', roundNumber => {
    store.dispatch(UpdateRoundNumber(roundNumber));
})

socket.on("update-countdown", countdown => {
    store.dispatch(UpdateCountdown(countdown));
})

socket.on("loading-header", loadingHeader =>{
    store.dispatch(UpdateLoadingHeader(loadingHeader));
})

socket.on("updated-guessnum", (socketId, guessNum) => {
    store.dispatch(UpdatePlayerGuessNum(socketId, guessNum));
})

socket.on("updated-best-guess", (guess) => {
    store.dispatch(UpdateBestMapGuess(guess))
})

socket.on("updated-results-to-choose", val => {
    store.dispatch(UpdateResultsToChooseFrom(val))
})

socket.on("updated-max-countdown", maxCountdown => {
    store.dispatch(UpdateBaseGameSetting({
        maxCountdown
    }))
})

socket.on("updated-guess-limit", (guessLimit) => {
    store.dispatch(UpdateBaseGameSetting({
        guessLimit
    }))
})

socket.on('new-round', ({guessNum, countdown, roundNumber}) => {
    store.dispatch(UpdateCountdown(countdown));
    store.dispatch(UpdateRoundNumber(roundNumber));
    store.dispatch(UpdateLoadingHeader(true));
    store.dispatch(UpdateDataToAllPlayers({
        guessNum
    }))
    store.dispatch(UpdateBestMapGuess(undefined));
    store.dispatch(ClearLocationData());
    
})

socket.on('update-show-round-end-modal', (showRoundEndModal) => {
    store.dispatch(changeShowRoundEndModal(showRoundEndModal));
})

socket.on("update-round-end-countdown", (roundEndCountdown) => {
    store.dispatch(UpdateRoundEndCountdown(roundEndCountdown))
})

socket.on("emit-round-end-location-data", data => {
    store.dispatch(AddRoundEndLocationData(data.lnglat, data.wikiId))
})

socket.on('emit-round-end-player-data', playerList => {
    store.dispatch(UpdateRoundEndPlayerData(playerList))
})

socket.on('init-game-data-status', initDataStatus => {
    store.dispatch(UpdateBaseGameSetting({
        initDataStatus
    }))
})