import { GamePageAttrs, GamePageState } from "./types";
import m from "mithril";
import { pluck, distinctUntilChanged } from "rxjs/operators";
import { extendBaseModel } from "base/baseModel";
import { bindTo } from "base/operators";
import { socket } from "socket/socket-main";

interface GamePageModel {
  handleComponentInit: (
    vnode: m.VnodeDOM<GamePageAttrs, GamePageState>
  ) => void;
  handleComponentRemove: (
    vnode: m.VnodeDOM<GamePageAttrs, GamePageState>
  ) => void;
}

export const model: GamePageModel = extendBaseModel({
  handleComponentInit: (vnode: m.VnodeDOM<GamePageAttrs, GamePageState>) => {
    const { store$ } = vnode.attrs;
    vnode.state.subscriptions = [];

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
      store$
        .pipe(
          pluck("GameData", "beginningCountdown"),
          distinctUntilChanged(),
          bindTo("countdown", vnode)
        )
        .subscribe()
    );
  },
  handleComponentCreate: (
    vnode: m.VnodeDOM<GamePageAttrs, GamePageState>
  ) => {},
});
