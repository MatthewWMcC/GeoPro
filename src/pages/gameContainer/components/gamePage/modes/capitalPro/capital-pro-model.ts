import { CapitalProAttrs, CapitalProState } from "./types";
import m from "mithril";
import {
  pluck,
  distinctUntilChanged,
  filter,
  switchMap,
  take,
} from "rxjs/operators";
import { extendBaseModel } from "base/baseModel";
import { bindTo } from "base/operators";
import { socket } from "socket/socket-main";
import { capitialProViewStates } from "state/GameData/modes/CapitalProData/types";

interface CapitalProModel {
  handleComponentInit: (
    vnode: m.VnodeDOM<CapitalProAttrs, CapitalProState>
  ) => void;
  handleComponentRemove: (
    vnode: m.VnodeDOM<CapitalProAttrs, CapitalProState>
  ) => void;
  handleComponentCreate: (
    vnode: m.VnodeDOM<CapitalProAttrs, CapitalProState>
  ) => void;
  handleOnReturnClick: () => void;
  handleOnRestartClick: () => void;
}

export const model: CapitalProModel = extendBaseModel({
  handleComponentInit: (
    vnode: m.VnodeDOM<CapitalProAttrs, CapitalProState>
  ) => {
    const { store$ } = vnode.attrs;
    vnode.state.subscriptions = [];

    const viewState$ = store$.pipe(
      pluck("GameData", "modeData", "viewState"),
      distinctUntilChanged()
    );

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
          pluck("GameData", "gameMode"),
          distinctUntilChanged(),
          bindTo("gameMode", vnode)
        )
        .subscribe()
    );

    vnode.state.subscriptions.push(
      viewState$
        .pipe(
          filter((viewState) => viewState === capitialProViewStates.GAME_END),
          switchMap(() =>
            store$.pipe(
              pluck("GameData", "modeData", "playerList", 0),
              distinctUntilChanged(),
              take(1)
            )
          ),
          bindTo("winningPlayer", vnode)
        )
        .subscribe()
    );
  },
  handleComponentCreate: (
    vnode: m.VnodeDOM<CapitalProAttrs, CapitalProState>
  ) => {},
  handleOnReturnClick: () => {
    socket.emit("return-game-to-wait");
  },
  handleOnRestartClick: () => {
    socket.emit("restart-game");
  },
});
