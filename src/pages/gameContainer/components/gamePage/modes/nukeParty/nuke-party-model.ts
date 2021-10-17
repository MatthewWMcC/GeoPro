import { extendBaseModel } from "base/baseModel";
import { bindTo } from "base/operators";
import m from "mithril";
import { distinctUntilChanged, map, pluck, tap } from "rxjs/operators";
import { socket } from "socket/socket-main";
import { updateCanGuess } from "state/GameData/modes/NukePartyData/actions";
import { nukePartyPlayer } from "state/GameData/modes/NukePartyData/types";
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
          pluck("GameData", "modeData", "canGuess"),
          distinctUntilChanged(),
          bindTo("canGuess", vnode)
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

    vnode.state.subscriptions.push(
      store$
        .pipe(
          pluck("GameData", "modeData", "guessStatus"),
          distinctUntilChanged(),
          bindTo("guessStatus", vnode)
        )
        .subscribe()
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
          pluck("GameData", "modeData", "playerList"),
          distinctUntilChanged(
            (prev, curr) => JSON.stringify(curr) === JSON.stringify(prev)
          ),
          map((playerList) => playerList.find((player) => player.lives > 0)),
          map((player) => player.username),
          bindTo("winner", vnode)
        )
        .subscribe()
    );
  },

  handleSubmitButtonPress: (
    vnode: m.VnodeDOM<NukePartyAttrs, NukePartyState>
  ) => {
    const { selected, canGuess } = vnode.state;
    if (selected?.countryCode && canGuess) {
      socket.emit("nuke-party-guess", selected.countryCode);
      store.dispatch(updateCanGuess(false));
    }
  },
  handleOnReturnClick: () => {
    if (store.getState().GameData.admin === store.getState().UserData.userId) {
      socket.emit("return-game-to-wait");
    }
  },
  handleOnRestartClick: () => {
    if (store.getState().GameData.admin === store.getState().UserData.userId) {
      socket.emit("start-game", store.getState().GameData.roomId);
    }
  },
});
