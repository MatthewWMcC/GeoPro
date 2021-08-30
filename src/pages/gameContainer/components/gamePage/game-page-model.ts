import { GamePageAttrs, GamePageState } from "./types";
import m from "mithril";
import { pluck, distinctUntilChanged, filter, switchMap, take } from "rxjs/operators";
import { extendBaseModel } from "base/baseModel";
import { bindTo } from "base/operators";
import { socket } from "socket/socket-main";
import { capitialProViewStates } from "state/capitalProData/types";


interface GamePageModel {
    handleComponentInit: (vnode: m.VnodeDOM<GamePageAttrs, GamePageState>) => void;
    handleComponentRemove: (vnode: m.VnodeDOM<GamePageAttrs, GamePageState>) => void;
    handleComponentCreate: (vnode: m.VnodeDOM<GamePageAttrs, GamePageState>) => void;
    handleOnReturnClick: () => void;
    handleOnRestartClick: () => void;
} 

export const model: GamePageModel = extendBaseModel({
    handleComponentInit: (vnode: m.VnodeDOM<GamePageAttrs, GamePageState>) => {
        const { store$ } = vnode.attrs;
        vnode.state.subscriptions = [];

        const viewState$ = store$.pipe(
            pluck("CapitalProData", "viewState"),
            distinctUntilChanged()
        )

        vnode.state.subscriptions.push(
            store$.pipe(
                pluck("CapitalProData", "viewState"),
                distinctUntilChanged(),
                bindTo("viewState", vnode)
            ).subscribe()
        )

        vnode.state.subscriptions.push(
            viewState$.pipe(
                filter(viewState => viewState === capitialProViewStates.GAME_END),
                switchMap(() => store$.pipe(
                    pluck("CapitalProData", "playerList", 0),
                    distinctUntilChanged(),
                    take(1),
                )),
                bindTo("winningPlayer", vnode)
            ).subscribe()
        )
    },
    handleComponentCreate: (vnode: m.VnodeDOM<GamePageAttrs, GamePageState>) => {
    },
    handleOnReturnClick: () => {
        socket.emit("return-game-to-wait");
    },
    handleOnRestartClick: () => {
        socket.emit("restart-game");
    }
})