import { PlayerListAttrs, PlayerListState } from "./types";
import m from "mithril";
import mapboxgl from 'mapbox-gl';
import { tap, pluck, distinctUntilChanged } from "rxjs/operators";
import { extendBaseModel } from "base/baseModel";
import { bindTo } from "base/operators";


interface PlayerListModel {
    handleComponentInit: (vnode: m.VnodeDOM<PlayerListAttrs, PlayerListState>) => void;
    handleComponentRemove: (vnode: m.VnodeDOM<PlayerListAttrs, PlayerListState>) => void;
    handleComponentCreate: (vnode: m.VnodeDOM<PlayerListAttrs, PlayerListState>) => void;
} 

export const model: PlayerListModel = extendBaseModel({
    handleComponentInit: (vnode: m.VnodeDOM<PlayerListAttrs, PlayerListState>) => {
        const { store$ } = vnode.attrs;
        vnode.state.subscriptions = [];

        vnode.state.subscriptions.push(
            store$.pipe(
                pluck("GameData", "playerList"),
                distinctUntilChanged((prev, curr) => {
                   return prev.length === curr.length
                }),
                bindTo("playerList", vnode)
            ).subscribe()
        )
    }
})