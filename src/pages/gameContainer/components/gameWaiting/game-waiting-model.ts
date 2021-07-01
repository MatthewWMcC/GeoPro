import { extendBaseModel } from 'base/baseModel';
import m from 'mithril';
import { socket } from 'socket/socket-main';
import { GameWaitingAttrs, GameWaitingState } from "./types";
import { pluck, distinctUntilChanged, tap } from "rxjs/operators"

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
                pluck("GameData", "roomId"),
                distinctUntilChanged(),
                tap(roomId => vnode.state.roomId = roomId)
            ).subscribe()
        )

        vnode.state.subscriptions.push(
            store$.pipe(
                pluck("GameData", "playerList"),
                distinctUntilChanged((prev, curr) => {
                    return(prev.length === curr.length)
                }),
                tap(playerList => {
                    Object.assign(vnode.state, {["playerList"]: playerList});
                    m.redraw();
                })
            ).subscribe()
        )
    },
    handleStartButtonPress: (vnode: m.VnodeDOM<GameWaitingAttrs, GameWaitingState>) => {
        const {roomId} = vnode.state;
        socket.emit("start-game", roomId)
    }
})