import { MapAttrs, MapState } from "./types";
import m from "mithril";
import mapboxgl from 'mapbox-gl';
import { getMapboxAPIToken } from 'utils/environment-vars-helper';

interface MapModel {
    handleComponentCreate: (vnode: m.VnodeDOM<MapAttrs, MapState>) => void;
} 

export const model: MapModel = {
    handleComponentCreate: (vnode: m.VnodeDOM<MapAttrs, MapState>) => {
        const map = new mapboxgl.Map({
            accessToken: getMapboxAPIToken(),
            container: document.querySelector(".map-container") as HTMLElement,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [0, 0],
            zoom: 0,
            interactive: true,
        })
    }
}