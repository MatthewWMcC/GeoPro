import { extendBaseModel } from "base/baseModel";
import m from "mithril";
import { socket } from "socket/socket-main";
import { GameWaitingAttrs, GameWaitingState } from "./types";
import { pluck, distinctUntilChanged, map } from "rxjs/operators";
import { bindTo } from "base/operators";
import { getRoomUrl } from "utils/url-helpers";

interface GameWaitingModel {
  handleComponentInit: (
    vnode: m.VnodeDOM<GameWaitingAttrs, GameWaitingState>
  ) => void;
  handleStartButtonPress: (
    vnode: m.VnodeDOM<GameWaitingAttrs, GameWaitingState>
  ) => void;
  handleComponentRemove: (
    vnode: m.VnodeDOM<GameWaitingAttrs, GameWaitingState>
  ) => void;
  handleCopyURL: (
    vnode: m.VnodeDOM<GameWaitingAttrs, GameWaitingState>
  ) => void;
}

export const model: GameWaitingModel = extendBaseModel({
  handleComponentInit: (
    vnode: m.VnodeDOM<GameWaitingAttrs, GameWaitingState>
  ) => {
    const { store$ } = vnode.attrs;
    vnode.state.subscriptions = [];

    vnode.state.subscriptions.push(
      store$
        .pipe(
          pluck("GameData", "modeData", "playerList"),
          distinctUntilChanged(),
          bindTo("playerList", vnode)
        )
        .subscribe()
    );

    vnode.state.subscriptions.push(
      store$
        .pipe(
          pluck("GameData", "roomId"),
          distinctUntilChanged(),
          map((roomId) => {
            return getRoomUrl(roomId);
          }),
          bindTo("roomURL", vnode)
        )
        .subscribe()
    );
  },
  handleStartButtonPress: (
    vnode: m.VnodeDOM<GameWaitingAttrs, GameWaitingState>
  ) => {
    socket.emit("start-nuke-party-game");
  },
  handleCopyURL: (vnode: m.VnodeDOM<GameWaitingAttrs, GameWaitingState>) => {
    const { roomURL } = vnode.state;

    navigator.clipboard.writeText(roomURL);
  },
});
