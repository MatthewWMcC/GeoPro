import { MapAttrs, MapState } from "./types";
import m from "mithril";
import mapboxgl from 'mapbox-gl';
import { getMapboxAPIToken } from 'utils/environment-vars-helper';
import { tap, pluck, distinctUntilChanged } from "rxjs/operators";
import { extendBaseModel } from "base/baseModel";


interface MapModel {
    handleComponentInit: (vnode: m.VnodeDOM<MapAttrs, MapState>) => void;
    handleComponentRemove: (vnode: m.VnodeDOM<MapAttrs, MapState>) => void;
    handleComponentCreate: (vnode: m.VnodeDOM<MapAttrs, MapState>) => void;
} 

export const model: MapModel = extendBaseModel({
    handleComponentInit: (vnode: m.VnodeDOM<MapAttrs, MapState>) => {
        const {store$} = vnode.attrs;
        vnode.state.subscriptions = [];

        vnode.state.subscriptions.push(
            store$.pipe(
                pluck("UserData", "preferedMapStyle"),
                // take(1),
                distinctUntilChanged((prev, curr) => {
                    return JSON.stringify(prev) === JSON.stringify(curr);
                }),
                    tap(mapStyle => {
                        console.log("applied")
                        vnode.state.mapStyle = mapStyle;
                        vnode.state.map && vnode.state.map.setStyle(mapStyle.withBorders);
                    })
            ).subscribe()
        )

    },
    handleComponentCreate: (vnode: m.VnodeDOM<MapAttrs, MapState>) => {
        vnode.state.map = new mapboxgl.Map({
            accessToken: getMapboxAPIToken(),
            container: document.querySelector(".map-container") as HTMLElement,
            style: vnode.state.mapStyle.withBorders,
            center: [-30, 45],
            zoom: 1,
            interactive: true,
        })  
        vnode.state.map.scrollZoom.setWheelZoomRate(1/250);
    }
})