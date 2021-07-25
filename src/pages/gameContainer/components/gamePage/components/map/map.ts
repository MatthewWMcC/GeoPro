import m from 'mithril';
import "./map.css"
import { MapAttrs, MapState } from './types';
import { model } from './map-model'; 
import { cityHeader } from './components/cityNameView/city-header';

export const map: m.Component<MapAttrs, MapState> = {
    oninit: model.handleComponentInit,
    onremove: model.handleComponentRemove,
    oncreate: model.handleComponentCreate,
    view: (vnode: m.VnodeDOM<MapAttrs, MapState>): m.Children => {
        const { store$ } = vnode.attrs;

        return  m(".map-and-surrounding-elems-container", [
             m(cityHeader, {
                store$
            }),
              
            m("#map-container", 
            { style: 'height: calc(100vh - 150px)' }
            ),
        ])
    }     
}