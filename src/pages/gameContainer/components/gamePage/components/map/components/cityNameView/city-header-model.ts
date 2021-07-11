import { CityHeaderAttrs, CityHeaderState } from "./types";
import m from "mithril";
import { tap, pluck, distinctUntilChanged } from "rxjs/operators";
import { extendBaseModel } from "base/baseModel";
import { bindTo } from "base/operators";
import { socket } from "socket/socket-main";
import { store } from "state/store";


interface CityHeaderModel {
    handleComponentInit: (vnode: m.VnodeDOM<CityHeaderAttrs, CityHeaderState>) => void;
    handleComponentRemove: (vnode: m.VnodeDOM<CityHeaderAttrs, CityHeaderState>) => void;
    handleComponentCreate: (vnode: m.VnodeDOM<CityHeaderAttrs, CityHeaderState>) => void;
    handleSubmitClick: (vnode: m.VnodeDOM<CityHeaderAttrs, CityHeaderState>) => void;
} 

export const model: CityHeaderModel = extendBaseModel({
    handleComponentInit: (vnode: m.VnodeDOM<CityHeaderAttrs, CityHeaderState>) => {
        const {store$} = vnode.attrs;
        vnode.state.subscriptions = [];

        vnode.state.countdown = 0;

        vnode.state.subscriptions.push(
            store$.pipe(pluck("GameData", "locationHeaderData"),
            distinctUntilChanged(),
            bindTo("locationHeaderData", vnode)
            ).subscribe()
        )

        vnode.state.subscriptions.push(
            store$.pipe(pluck("GameData", "countdown"),
            distinctUntilChanged(),
            bindTo("countdown", vnode)
            ).subscribe()
        )

        vnode.state.subscriptions.push(
            store$.pipe(pluck("GameData", "roundNumber"),
            distinctUntilChanged(),
            bindTo("roundNumber", vnode)
            ).subscribe()
        )

        vnode.state.subscriptions.push(
            store$.pipe(pluck("GameData", "loadingHeader"),
            distinctUntilChanged(),
            bindTo("loadingHeader", vnode)
            ).subscribe()
        )

        vnode.state.subscriptions.push(
            store$.pipe(pluck("GameData", "currentMapGuess"),
            distinctUntilChanged(),
            bindTo("currentMapGuess", vnode)
            ).subscribe()
        )
    },
    handleSubmitClick: (vnode: m.VnodeDOM<CityHeaderAttrs, CityHeaderState>) => {
        const { currentMapGuess } = vnode.state;
        socket.emit('player-location-guess', currentMapGuess);
    }
})