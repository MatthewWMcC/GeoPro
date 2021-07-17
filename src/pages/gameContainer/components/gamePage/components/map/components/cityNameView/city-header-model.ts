import { CityHeaderAttrs, CityHeaderState } from "./types";
import m from "mithril";
import { tap, pluck, distinctUntilChanged, map } from "rxjs/operators";
import { extendBaseModel } from "base/baseModel";
import { bindTo, findObjectWithKeyValuePair } from "base/operators";
import { socket } from "socket/socket-main";
import { store } from "state/store";
import { combineLatest } from "rxjs";


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

        const currentMapGuess$ = store$.pipe(
            pluck("GameData", "currentMapGuess"),
            distinctUntilChanged(),
        )

        const haveGuesses$ = store$.pipe(
            pluck("GameData", "playerList"),
            distinctUntilChanged(),
            findObjectWithKeyValuePair("userId", store.getState().UserData.userId),
            pluck("guessNum"),
            map(guessNum => guessNum > 0)
        )

        vnode.state.subscriptions.push(
            currentMapGuess$.pipe(
                bindTo("currentMapGuess", vnode)
            ).subscribe()
        )

        vnode.state.subscriptions.push(
            combineLatest([currentMapGuess$, haveGuesses$]).pipe(
                map(([val1, val2]) => !!val1 && val2),
                bindTo("submitActive", vnode)
            ).subscribe()
        )
    },
    handleSubmitClick: (vnode: m.VnodeDOM<CityHeaderAttrs, CityHeaderState>) => {
        const { currentMapGuess } = vnode.state;
        if(currentMapGuess) {
            socket.emit('player-location-guess', currentMapGuess);
        }
    }
})