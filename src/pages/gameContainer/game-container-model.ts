import m from 'mithril';
import { distinctUntilChanged, pluck, tap } from 'rxjs/operators';
import { initSocketDataSetup } from 'socket/socket-helpers';
import { socket } from 'socket/socket-main';
import { GameContainerAttrs, GameContainerState } from "./types";

interface GameContainerModel {
    handleComponentInit: (vnode: m.VnodeDOM<GameContainerAttrs, GameContainerState>) => void;
    handleComponentRemove: (vnode: m.VnodeDOM<GameContainerAttrs, GameContainerState>) => void;
}

export const model: GameContainerModel = {
    handleComponentRemove: (vnode: m.VnodeDOM<GameContainerAttrs, GameContainerState>) => {
        const {roomId} = vnode.attrs; 
        vnode.state.subscriptions.forEach(subscription => subscription.unsubscribe());
        vnode.state.subscriptions = [];
        socket.emit("leave-game", roomId)
    },
    handleComponentInit: (vnode: m.VnodeDOM<GameContainerAttrs, GameContainerState>) => {
        vnode.state.inGame = true;
        vnode.state.subscriptions = [];

        const {store$, roomId} = vnode.attrs;
        console.log("re init")
        initSocketDataSetup(store$);
        socket.emit("join-room", roomId);

        vnode.state.subscriptions.push(
            store$.pipe(
                pluck("GameData", "playerList"),
            ).subscribe()
        )

        vnode.state.subscriptions.push(
            store$.pipe(
                pluck("GameData", "inGame"),
                distinctUntilChanged(),
                tap(inGame => {
                    vnode.state.inGame = inGame
                    m.redraw()
                })
            ).subscribe()
        )
    }
}