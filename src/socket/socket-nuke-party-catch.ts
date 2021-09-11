import m from "mithril";
import { InitRoomData } from "state/GameData/actions";
import {
  setInGameViewState,
  setNewQestion,
  setNewTurn,
} from "state/GameData/modes/NukePartyData/actions";
import {
  nukePartyViewStates,
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
        },
      })
    );
  });

  socket.on("started-nuke-party", (viewState: nukePartyViewStates) => {
    store.dispatch(setInGameViewState(viewState));
  });

  socket.on("new-nuke-round", (userId: string) => {
    store.dispatch(setNewTurn(userId));
  });

  socket.on("emit-new-question", (question: questionType) => {
    store.dispatch(setNewQestion(question));
  });

  socket.on("new-nuke-party-player", (data) => {});
};
