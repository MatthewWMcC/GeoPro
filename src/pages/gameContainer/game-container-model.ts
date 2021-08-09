import { bindTo } from 'base/operators';
import m from 'mithril';
import { distinctUntilChanged, pluck, tap } from 'rxjs/operators';
import { initSocketDataSetup } from 'socket/socket-helpers';
import { socket } from 'socket/socket-main';
import { ClearGameData } from 'state/GameData/actions';
import { store } from 'state/store';
import { GameContainerAttrs, GameContainerState } from "./types";

interface GameContainerModel {
    handleComponentInit: (vnode: m.VnodeDOM<GameContainerAttrs, GameContainerState>) => void;
    handleComponentRemove: (vnode: m.VnodeDOM<GameContainerAttrs, GameContainerState>) => void;
}

export const model: GameContainerModel = {
    handleComponentRemove: (vnode: m.VnodeDOM<GameContainerAttrs, GameContainerState>) => {
        vnode.state.subscriptions.forEach(subscription => subscription.unsubscribe());
        vnode.state.subscriptions = [];
        console.log("leaving container")
        socket.emit("leave-game")
        store.dispatch(ClearGameData())
    },
    handleComponentInit: (vnode: m.VnodeDOM<GameContainerAttrs, GameContainerState>) => {
        vnode.state.inGame = true;
        vnode.state.subscriptions = [];

        const {store$, roomId} = vnode.attrs;
        console.log("re init")
        initSocketDataSetup(store$);
        setTimeout(() => {
            socket.emit("join-room", roomId);
        }, 1000)


        vnode.state.subscriptions.push(
            store$.pipe(
                pluck("GameData", "initDataStatus"),
                distinctUntilChanged(),
                bindTo("doneLoading", vnode)
            ).subscribe()
        )

        vnode.state.subscriptions.push(
            store$.pipe(
                pluck("GameData", "inGame"),
                distinctUntilChanged(),
                bindTo("inGame", vnode)
            ).subscribe()
        )
    }
}