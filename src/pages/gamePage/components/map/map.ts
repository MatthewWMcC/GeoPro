import m from 'mithril';
import "./map.css"
import { MapAttrs, MapState } from './types';
import { model } from './map-model'; 
// import "mapbox-gl/dist/mapbox-gl.css";

export const map: m.Component<MapAttrs, MapState> = {
    oncreate: model.handleComponentCreate,
    view: (vnode: m.VnodeDOM<MapAttrs, MapState>): m.Children => {
        return  m(".map-and-surrounding-elems-container", [
            m(".map-container", 
            { style: 'height: 60vh' }
            ),
        ])
    }     
}