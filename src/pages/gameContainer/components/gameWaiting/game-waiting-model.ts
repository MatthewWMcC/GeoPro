import { extendBaseModel } from 'base/baseModel';
import m from 'mithril';
import { socket } from 'socket/socket-main';
import { GameWaitingAttrs, GameWaitingState } from "./types";
import { pluck, distinctUntilChanged, tap } from "rxjs/operators"
import { bindTo } from 'base/operators';

interface GameWaitingModel {
    handleComponentInit: (vnode: m.VnodeDOM<GameWaitingAttrs, GameWaitingState>) => void;
    handleStartButtonPress: (vnode: m.VnodeDOM<GameWaitingAttrs, GameWaitingState>) => void;
    handleComponentRemove: (vnode: m.VnodeDOM<GameWaitingAttrs, GameWaitingState>) => void;
}

export const model: GameWaitingModel = extendBaseModel({
    handleComponentInit: (vnode: m.VnodeDOM<GameWaitingAttrs, GameWaitingState>) => {
        const { store$ } = vnode.attrs;
        vnode.state.subscriptions = [];

        vnode.state.subscriptions.push(
            store$.pipe(
                pluck("CapitalProData", "playerList"),
                distinctUntilChanged(),
                bindTo("playerList", vnode)
            ).subscribe()
        )

        vnode.state.subscriptions.push(
            store$.pipe(
                pluck("GameData", "roomId"),
                distinctUntilChanged(),
                bindTo("roomId", vnode)
            ).subscribe()
        )
    },
    handleStartButtonPress: (vnode: m.VnodeDOM<GameWaitingAttrs, GameWaitingState>) => {
        const { roomId } = vnode.state;
        socket.emit("start-game", roomId)
    }
})