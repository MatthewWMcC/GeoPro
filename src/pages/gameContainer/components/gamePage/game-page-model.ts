import { GamePageAttrs, GamePageState } from "./types";
import m from "mithril";
import { tap, pluck, distinctUntilChanged, filter, switchMap, take } from "rxjs/operators";
import { store } from "state/store";
import { extendBaseModel } from "base/baseModel";
import { bindTo } from "base/operators";
import { socket } from "socket/socket-main";


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

        const gameEnd$ = store$.pipe(
            pluck("GameData", "showGameEnd"),
            distinctUntilChanged()
        )

        vnode.state.subscriptions.push(
            store$.pipe(
                pluck("CurrentPageData", "showRoundEndModal"),
                distinctUntilChanged(),
                bindTo("showRoundEndModal", vnode)
            ).subscribe()
        )

        vnode.state.subscriptions.push(
            gameEnd$.pipe(
                bindTo("showGameEnd", vnode)
            ).subscribe()
        )

        vnode.state.subscriptions.push(
            gameEnd$.pipe(
                filter(gameEnd => !!gameEnd),
                switchMap(() => store$.pipe(
                    pluck("GameData", "playerList", 0),
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