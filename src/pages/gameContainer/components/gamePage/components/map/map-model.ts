import { MapAttrs, MapState } from "./types";
import m from "mithril";
import mapboxgl from 'mapbox-gl';
import { getMapboxAPIToken } from 'utils/environment-vars-helper';
import { tap, pluck, distinctUntilChanged, map } from "rxjs/operators";
import { extendBaseModel } from "base/baseModel";
import { store } from "state/store";
import { setCurrentMapGuess } from "state/GameData/actions";
import { bindTo } from "base/operators";


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
                distinctUntilChanged((prev, curr) => {
                    return JSON.stringify(prev) === JSON.stringify(curr);
                }),
                    tap(mapStyle => {
                        vnode.state.mapStyle = mapStyle;
                        vnode.state.map && vnode.state.map.setStyle(mapStyle.withBorders);
                    })
            ).subscribe()
        )

        

    },
    handleComponentCreate: (vnode: m.VnodeDOM<MapAttrs, MapState>) => {
        const {store$} = vnode.attrs; 

        vnode.state.map = new mapboxgl.Map({
            accessToken: getMapboxAPIToken(),
            container: document.querySelector(".map-container") as HTMLElement,
            style: vnode.state.mapStyle.withBorders,
            center: [-30, 45],
            zoom: 1,
            interactive: true,
        })  
        vnode.state.map.scrollZoom.setWheelZoomRate(1/250);
        vnode.state.map.on('style.load', function() {
            vnode.state.map.on("click", (e) => {
                store.dispatch(setCurrentMapGuess(e.lngLat));
            })
        })

        vnode.state.subscriptions.push(
            store$.pipe(
                pluck("GameData", "currentMapGuess"),
                distinctUntilChanged(),
                map(currentMapGuess => {
                    if (!currentMapGuess) return;
                    const marker = new mapboxgl.Marker()
                    .setLngLat(currentMapGuess)
                    .addTo(vnode.state.map);
                    return marker;
                }),
                tap(_ => {
                    vnode.state.marker && vnode.state.marker.remove()
                }),
                bindTo("marker", vnode)
            ).subscribe()
        )

        vnode.state.subscriptions.push(
            store$.pipe(
                pluck("GameData", "bestMapGuess"),
                distinctUntilChanged(),
                map(bestMapGuess => {
                    if(!bestMapGuess) return;
                    const bestMarker = new mapboxgl.Marker({
                        color: "#FFFFFF",
                    })
                    .setLngLat(bestMapGuess)
                    .addTo(vnode.state.map);
                    return bestMarker;
                }),
                tap(_ => {
                    vnode.state.bestMarker && vnode.state.bestMarker.remove();
                    vnode.state.marker && vnode.state.marker.remove();
                }),
                bindTo("bestMarker", vnode)
            ).subscribe()
        )
    }
})