import socketIOClient from "socket.io-client";
import {
  AddPlayer,
  DeletePlayer,
  InitRoomData,
  SetGameViewState,
  UpdateBeginningCountdown,
} from "state/GameData/actions";
import { store } from "state/store";

import m from "mithril";
import { GameViewStates } from "state/GameData/types";
import {
  GameEnd,
  GameStartData,
  NewLocationData,
  NewRoundData,
  RemoveInGameData,
  RoundEndSetup,
  UpdateGuessLimit,
  UpdateMaxCountdown,
  UpdatePlayerGuessNum,
  UpdateBestMapGuess,
  UpdateRoundEndCountdown,
  UpdateCountdown,
  UpdateResultNum,
} from "state/GameData/modes/CapitalProData/actions";
import { nukePartySocketObservables } from "./socket-nuke-party-catch";

export const socket = socketIOClient();

socket.on("connection-event", (data) => {});

socket.on("started-new-game-data", (data) => {
  m.route.set(`/room/${data.roomId}`);

  store.dispatch(
    InitRoomData({
      admin: data.admin,
      roomId: data.roomId,
      gameMode: data.gameMode,
      GameViewState: GameViewStates.IN_GAME,
      modeData: {
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
      },
    })
  );
});

socket.on("joined-new-game-data", (data) => {
  store.dispatch(
    InitRoomData({
      admin: data.admin,
      roomId: data.roomId,
      gameMode: data.gameMode,
      GameViewState: GameViewStates.IN_GAME,
      modeData: {
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
      },
    })
  );
});

socket.on("new-player", (player) => {
  store.dispatch(AddPlayer(player));
});

socket.on("updated-results-to-choose", (resultsNum) => {
  store.dispatch(UpdateResultNum(resultsNum));
});

socket.on("updated-max-countdown", (maxCountdown) => {
  store.dispatch(UpdateMaxCountdown(maxCountdown));
});

socket.on("updated-guess-limit", (guessLimit) => {
  store.dispatch(UpdateGuessLimit(guessLimit));
});

socket.on("remove-game-data", ({ viewState, playerList }) => {
  store.dispatch(RemoveInGameData(playerList, viewState));
});

socket.on("player-left", (playerLeftId) => {
  store.dispatch(DeletePlayer(playerLeftId));
});

socket.on("game-start-data", ({ viewState, playerList, locationData }) => {
  store.dispatch(GameStartData(playerList, locationData, viewState));
});

socket.on("update-countdown", (countdown) => {
  store.dispatch(UpdateCountdown(countdown));
});

socket.on(
  "new-round",
  ({ guessNum, countdown, roundNumber, viewState, locationData }) => {
    store.dispatch(
      NewRoundData(guessNum, countdown, roundNumber, viewState, locationData)
    );
  }
);

socket.on("new-location", (newLocation) => {
  store.dispatch(NewLocationData(newLocation));
});

socket.on(
  "round-end-modal-setup",
  ({ viewState, playerList, roundEndCountdown, roundEndLocationData }) => {
    store.dispatch(
      RoundEndSetup(
        viewState,
        playerList,
        roundEndCountdown,
        roundEndLocationData
      )
    );
  }
);

socket.on("update-round-end-countdown", (roundEndCountdown) => {
  store.dispatch(UpdateRoundEndCountdown(roundEndCountdown));
});

socket.on("game-end", (viewState) => {
  store.dispatch(GameEnd(viewState));
});

socket.on("updated-guessnum", (userId, guessNum) => {
  store.dispatch(UpdatePlayerGuessNum(userId, guessNum));
});

socket.on("updated-best-guess", (bestGuess) => {
  store.dispatch(UpdateBestMapGuess(bestGuess));
});

socket.on("no-room-found", () => {
  store.dispatch(SetGameViewState(GameViewStates.ROOM_NOT_FOUND));
});

socket.on("duplicate-player", () => {
  store.dispatch(SetGameViewState(GameViewStates.DUPLICATE_PLAYER_IN_ROOM));
});

socket.on("overlay-countdown-update", (countdown) =>
  store.dispatch(UpdateBeginningCountdown(countdown))
);

socket.on("cannot-join", (message) => {
  store.dispatch(SetGameViewState(GameViewStates.CANNOT_JOIN_ROOM, message));
});

nukePartySocketObservables(socket);
