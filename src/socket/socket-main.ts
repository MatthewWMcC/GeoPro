import socketIOClient from "socket.io-client";
import { AddPlayer, DeletePlayer,
    InitRoomData, 
    SetGameViewState} from "state/GameData/actions";
import { store } from "state/store";
const serverEndpoint = process.env.SERVER as string; 
import m from 'mithril';
import { GameViewStates, player } from "state/GameData/types";
import { AddPlayerCapital, DeletePlayerCapital, GameEnd, GameStartData, InitRoomDataCapital, NewLocationData, NewRoundData, RemoveInGameData, RoundEndSetup, UpdateGuessLimit, UpdateMaxCountdown, UpdatePlayerGuessNum, UpdateBestMapGuess, UpdateRoundEndCountdown, UpdateCountdown, UpdateResultNum } from "state/capitalProData/actions";
import { CapitalProPlayer } from "state/capitalProData/types";

export const socket = socketIOClient(serverEndpoint);

socket.on("connection-event", data => {
    console.log(data);
})

socket.on("started-new-game-data", data => {
    m.route.set(`/game-container/${data.roomId}`);
    store.dispatch(InitRoomData({
        admin: data.admin,
        playerList: data.playerList.map((player: CapitalProPlayer) => {
            return simplifyPlayerData(player)
        }),
        roomId: data.roomId,
        gameMode: data.gameMode,
        GameViewState: GameViewStates.IN_GAME
    }))
    store.dispatch(InitRoomDataCapital({
        playerList: data.playerList,
        locationData: data.locationData,
        countdown: data.countdown,
        roundNumber: data.roundNumber,
        maxRound: data.maxRound,
        resultsToChooseFrom: data.resultsToChooseFrom,
        maxCountdown: data.maxCountdown,
        guessLimit: data.guessLimit,
        roundEndCountdown: data.roundEndCountdown,
        viewState: data.viewState,
    }))
})

socket.on("joined-new-game-data", data => {
    store.dispatch(InitRoomData({
        admin: data.admin,
        playerList: data.playerList.map((player: CapitalProPlayer) => {
            return simplifyPlayerData(player)
        }),
        roomId: data.roomId,
        gameMode: data.gameMode,
        GameViewState: GameViewStates.IN_GAME
    }))
    store.dispatch(InitRoomDataCapital({
        playerList: data.playerList,
        locationData: data.locationData,
        countdown: data.countdown,
        roundNumber: data.roundNumber,
        maxRound: data.maxRound,
        resultsToChooseFrom: data.resultsToChooseFrom,
        maxCountdown: data.maxCountdown,
        guessLimit: data.guessLimit,
        roundEndCountdown: data.roundEndCountdown,
        viewState: data.viewState,
    }))
})

socket.on("new-player", player => {
    console.log(player[0]);
    store.dispatch(AddPlayer(simplifyPlayerData(player)));
    store.dispatch(AddPlayerCapital(player));
})

socket.on("updated-results-to-choose", resultsNum => {
    store.dispatch(UpdateResultNum(resultsNum));
})

socket.on("updated-max-countdown", maxCountdown => {
    store.dispatch(UpdateMaxCountdown(maxCountdown));
})

socket.on("updated-guess-limit", guessLimit => {
    store.dispatch(UpdateGuessLimit(guessLimit));
})

socket.on("remove-game-data", ({playerList,
    roundNumber,
    locationData,
    viewState}) => {
        store.dispatch(RemoveInGameData(playerList,roundNumber,locationData,viewState));
})

socket.on("player-left", playerLeftId => {
    store.dispatch(DeletePlayer(playerLeftId));
    store.dispatch(DeletePlayerCapital(playerLeftId))
})

socket.on("game-start-data", ({viewState, playerList, locationData}) => {
    console.log("startttttt")
    store.dispatch(GameStartData(playerList,locationData,viewState));
})

socket.on("update-countdown", countdown => {
    store.dispatch(UpdateCountdown(countdown));
})

socket.on("new-round", ({guessNum, countdown, roundNumber, viewState, locationData}) => {
    store.dispatch(NewRoundData(guessNum,countdown,roundNumber,viewState,locationData))
})

socket.on("new-location", newLocation => {
    store.dispatch(NewLocationData(newLocation));
})

socket.on("round-end-modal-setup", ({viewState, playerList, roundEndCountdown, roundEndLocationData}) => {
    store.dispatch(RoundEndSetup(viewState,playerList,roundEndCountdown,roundEndLocationData));
})

socket.on("update-round-end-countdown", roundEndCountdown => {
    store.dispatch(UpdateRoundEndCountdown(roundEndCountdown));
})

socket.on("game-end", viewState => {
    store.dispatch(GameEnd(viewState));
})

socket.on("updated-guessnum", (userId, guessNum) => {
    store.dispatch(UpdatePlayerGuessNum(userId, guessNum));
})

socket.on("updated-best-guess", bestGuess => {
    store.dispatch(UpdateBestMapGuess(bestGuess))
})

socket.on("no-room-found", () => {
    store.dispatch(SetGameViewState(GameViewStates.ROOM_NOT_FOUND))
})

const simplifyPlayerData = (player: CapitalProPlayer): player => {
    return {
        userId: player.userId,
        socketId: player.socketId,
        username: player.username,
    }
}