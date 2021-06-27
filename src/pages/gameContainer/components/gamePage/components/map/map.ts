import m from 'mithril';
import "./map.css"
import { MapAttrs, MapState } from './types';
import { model } from './map-model'; 
import { MapStylesEnum } from 'state/UserData/types';
// import "mapbox-gl/dist/mapbox-gl.css";

export const map: m.Component<MapAttrs, MapState> = {
    oninit: model.handleComponentInit,
    onremove: model.handleComponentRemove,
    oncreate: model.handleComponentCreate,
    view: (vnode: m.VnodeDOM<MapAttrs, MapState>): m.Children => {
        return  m(".map-and-surrounding-elems-container", [
            m(".map-container", 
            { style: 'height: calc(100vh - 200px)' }
            ),
        ])
    }     
}