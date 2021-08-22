import { CityHeaderAttrs, CityHeaderState } from "./types";
import m from "mithril";
import { pluck, distinctUntilChanged, map } from "rxjs/operators";
import { extendBaseModel } from "base/baseModel";
import { bindTo, findObjectWithKeyValuePair } from "base/operators";
import { socket } from "socket/socket-main";
import { store } from "state/store";
import { combineLatest } from "rxjs";
import { SetCurrentMapGuess } from "state/capitalProData/actions";


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
            store$.pipe(pluck("CapitalProData", "locationData"),
            distinctUntilChanged(),
            bindTo("locationData", vnode)
            ).subscribe()
        )

        vnode.state.subscriptions.push(
            store$.pipe(pluck("CapitalProData", "countdown"),
            distinctUntilChanged(),
            bindTo("countdown", vnode)
            ).subscribe()
        )

        vnode.state.subscriptions.push(
            store$.pipe(pluck("CapitalProData", "roundNumber"),
            distinctUntilChanged(),
            bindTo("roundNumber", vnode)
            ).subscribe()
        )

        vnode.state.subscriptions.push(
            store$.pipe(pluck("GameData", "roomId"),
            distinctUntilChanged(),
            bindTo("roomId", vnode)
            ).subscribe()
        )

        const currentMapGuess$ = store$.pipe(
            pluck("CapitalProData", "currentMapGuess"),
            distinctUntilChanged(),
        )

        const haveGuesses$ = store$.pipe(
            pluck("CapitalProData", "playerList"),
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
        const { currentMapGuess, roomId } = vnode.state;
        if(currentMapGuess) {
            socket.emit('player-location-guess', roomId, currentMapGuess);
            store.dispatch(SetCurrentMapGuess(undefined));
        }
    }
})