import { extendBaseModel } from "base/baseModel";
import { bindTo } from "base/operators";
import m from "mithril";
import { distinctUntilChanged, pluck, tap } from "rxjs/operators";
import { socket } from "socket/socket-main";
import { store } from "state/store";
import { NukePartyAttrs, NukePartyState } from "./types";

export const model = extendBaseModel({
  handleComponentInit: (vnode: m.VnodeDOM<NukePartyAttrs, NukePartyState>) => {
    const { store$ } = vnode.attrs;
    vnode.state.subscriptions = [];

    vnode.state.subscriptions.push(
      store$
        .pipe(
          pluck("GameData", "modeData", "selected"),
          distinctUntilChanged(),
          bindTo("selected", vnode)
        )
        .subscribe()
    );

    vnode.state.subscriptions.push(
      store$
        .pipe(
          pluck("GameData", "modeData", "turnUserId"),
          distinctUntilChanged(),
          tap((turnUserId) => turnUserId === store.getState().UserData.userId),
          bindTo("myTurn", vnode)
        )
        .subscribe()
    );

    vnode.state.subscriptions.push(
      store$
        .pipe(
          pluck("GameData", "modeData", "question"),
          distinctUntilChanged(),
          bindTo("question", vnode)
        )
        .subscribe()
    );
  },

  handleSubmitButtonPress: (
    vnode: m.VnodeDOM<NukePartyAttrs, NukePartyState>
  ) => {
    const { selected } = vnode.state;
    if (selected?.countryCode) {
      socket.emit("nuke-party-guess", selected.countryCode);
    }
  },
});
