import m from "mithril";
import { InitRoomData } from "state/GameData/actions";
import {
  setGuessStatus,
  setInGameViewState,
  setNewQestion,
  setNewTurn,
  setNukeStatus,
  setSelectedCountry,
  updateAllPlayerLives,
  updateCanGuess,
  updatePlayerLives,
} from "state/GameData/modes/NukePartyData/actions";
import {
  countryType,
  guessStatus,
  nukePartyPlayer,
  nukePartyViewStates,
  nukeStatus,
  questionType,
} from "state/GameData/modes/NukePartyData/types";
import { GameViewStates } from "state/GameData/types";
import { store } from "state/store";

export const nukePartySocketObservables = (socket) => {
  socket.on("started-new-nuke-party-data", (data) => {
    m.route.set(`/room/${data.roomId}`);
    store.dispatch(
      InitRoomData({
        admin: data.admin,
        roomId: data.roomId,
        gameMode: data.gameMode,
        GameViewState: GameViewStates.IN_GAME,
        modeData: {
          viewState: data.viewState,
          playerList: data.playerList,
          nukeStatus: data.nukeStatus,
          canGuess: true,
        },
      })
    );
  });

  socket.on("joined-nuke-game-data", (data) => {
    store.dispatch(
      InitRoomData({
        admin: data.admin,
        roomId: data.roomId,
        gameMode: data.gameMode,
        GameViewState: GameViewStates.IN_GAME,
        modeData: {
          viewState: data.viewState,
          playerList: data.playerList,
          nukeStatus: data.nukeStatus,
          canGuess: true,
        },
      })
    );
  });

  socket.on(
    "started-nuke-party",
    (viewState: nukePartyViewStates, maxLives: number) => {
      store.dispatch(setInGameViewState(viewState));
      store.dispatch(setNukeStatus(nukeStatus.GREEN));
      store.dispatch(updateAllPlayerLives(maxLives));
    }
  );

  socket.on("new-nuke-round", (userId: string) => {
    store.dispatch(setNewTurn(userId));
  });

  socket.on("emit-new-question", (question: questionType) => {
    store.dispatch(setNewQestion(question));
  });

  socket.on("country-selected", (country: countryType) =>
    store.dispatch(setSelectedCountry(country))
  );

  socket.on("set-lives-value", (userId: string, lives: number) => {
    store.dispatch(updatePlayerLives(userId, lives));
  });

  socket.on("new-nuke-party-player", (data) => {});

  socket.on("set-nuke-status", (status: nukeStatus) =>
    store.dispatch(setNukeStatus(status))
  );

  socket.on("can-guess", (canGuess: boolean) => {
    store.dispatch(updateCanGuess(canGuess));
  });

  socket.on("update-guess-status", (guessStatus: guessStatus) => {
    store.dispatch(setGuessStatus(guessStatus));
  });

  socket.on("nuke-party-over", () => {
    store.dispatch(setInGameViewState(nukePartyViewStates.GAME_OVER));
  });
};
