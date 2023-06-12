import { bindTo } from "base/operators";
import m from "mithril";
import { distinctUntilChanged, pluck } from "rxjs/operators";
import { initSocketDataSetup } from "socket/socket-helpers";
import { socket } from "socket/socket-main";
import { UpdateCurrentPage } from "state/CurrentPageState/actions";
import { Pages } from "state/CurrentPageState/types";
import { ClearGameData } from "state/GameData/actions";
import { store } from "state/store";
import { GameContainerAttrs, GameContainerState } from "./types";

interface GameContainerModel {
  handleComponentInit: (
    vnode: m.VnodeDOM<GameContainerAttrs, GameContainerState>
  ) => void;
  handleComponentRemove: (
    vnode: m.VnodeDOM<GameContainerAttrs, GameContainerState>
  ) => void;
}

export const model: GameContainerModel = {
  handleComponentRemove: (
    vnode: m.VnodeDOM<GameContainerAttrs, GameContainerState>
  ) => {
    vnode.state.subscriptions.forEach((subscription) =>
      subscription.unsubscribe()
    );
    vnode.state.subscriptions = [];
    socket.emit("leave-game");
    store.dispatch(ClearGameData());
  },
  handleComponentInit: (
    vnode: m.VnodeDOM<GameContainerAttrs, GameContainerState>
  ) => {
    vnode.state.subscriptions = [];

    const { store$, roomId } = vnode.attrs;
    store.dispatch(UpdateCurrentPage(Pages.IN_GAME));
    initSocketDataSetup(store$);
    setTimeout(() => {
      socket.emit("join-room", roomId);
    }, 1000);

    vnode.state.subscriptions.push(
      store$
        .pipe(
          pluck("GameData", "modeData", "viewState"),
          distinctUntilChanged(),
          bindTo("viewState", vnode)
        )
        .subscribe()
    );

    vnode.state.subscriptions.push(
      store$
        .pipe(
          pluck("GameData", "modeData", "gameMode"),
          distinctUntilChanged(),
          bindTo("gameMode", vnode)
        )
        .subscribe()
    );

    vnode.state.subscriptions.push(
      store$
        .pipe(
          pluck("GameData", "GameViewState"),
          distinctUntilChanged(),
          bindTo("GameViewState", vnode)
        )
        .subscribe()
    );
  },
};
