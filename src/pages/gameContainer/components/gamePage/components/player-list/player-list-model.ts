import {
  nukeStatusColorMap,
  nukeStatusSpeedMap,
  PlayerListAttrs,
  PlayerListState,
} from "./types";
import m from "mithril";
import { tap, pluck, distinctUntilChanged, map } from "rxjs/operators";
import { extendBaseModel } from "base/baseModel";
import { bindTo } from "base/operators";
import { nukeStatus } from "state/GameData/modes/NukePartyData/types";

interface PlayerListModel {
  handleComponentInit: (
    vnode: m.VnodeDOM<PlayerListAttrs, PlayerListState>
  ) => void;
  handleComponentRemove: (
    vnode: m.VnodeDOM<PlayerListAttrs, PlayerListState>
  ) => void;
  handleComponentCreate: (
    vnode: m.VnodeDOM<PlayerListAttrs, PlayerListState>
  ) => void;
}

export const model: PlayerListModel = extendBaseModel({
  handleComponentInit: (
    vnode: m.VnodeDOM<PlayerListAttrs, PlayerListState>
  ) => {
    const { store$ } = vnode.attrs;
    vnode.state.subscriptions = [];

    vnode.state.subscriptions.push(
      store$
        .pipe(
          pluck("GameData", "modeData", "turnUserId"),
          distinctUntilChanged(),
          bindTo("turnUserId", vnode)
        )
        .subscribe()
    );

    vnode.state.subscriptions.push(
      store$
        .pipe(
          pluck("GameData", "modeData", "playerList"),
          distinctUntilChanged((prev, curr) => {
            return JSON.stringify(prev) === JSON.stringify(curr);
          }),
          bindTo("playerList", vnode)
        )
        .subscribe()
    );

    vnode.state.subscriptions.push(
      store$
        .pipe(
          pluck("GameData", "modeData", "nukeStatus"),
          distinctUntilChanged(),
          tap((nukeStatus) => {
            let r = document.querySelector(":root");
            r?.style?.setProperty(
              "--nuke-speed",
              nukeStatusSpeedMap[nukeStatus as nukeStatus]
            );
          }),
          map((nukeStatus) => nukeStatusColorMap[nukeStatus as nukeStatus]),
          bindTo("nukeColor", vnode)
        )
        .subscribe()
    );
  },
});
