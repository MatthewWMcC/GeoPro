import m from 'mithril';
import { GamePageAttrs, GamePageState } from './types';
import { model } from './game-page-model'; 
import {map} from "./components/map/map"

export const gamePage: m.Component<GamePageAttrs, GamePageState> = {
    oninit: model.handleComponentInit,
    onremove: model.handleComponentRemove,
    oncreate: model.handleComponentCreate,
    view: (vnode: m.VnodeDOM<GamePageAttrs, GamePageState>): m.Children => {
        const {store$} = vnode.attrs;
        return  m(".game-page-container",[
            m("h2", "game page"),
            m(map, {
                store$
            })
        ])
    }     
}