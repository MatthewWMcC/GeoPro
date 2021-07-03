import m from 'mithril';
import { GamePageAttrs, GamePageState } from './types';
import { model } from './game-page-model'; 
import {map} from "./components/map/map"
import "./game-page.css"
import { playerList } from './components/player-list/player-list';

export const gamePage: m.Component<GamePageAttrs, GamePageState> = {
    oninit: model.handleComponentInit,
    onremove: model.handleComponentRemove,
    oncreate: model.handleComponentCreate,
    view: (vnode: m.VnodeDOM<GamePageAttrs, GamePageState>): m.Children => {
        const {store$} = vnode.attrs;
        return  m(".game-page-container",[
            m(".map-and-players-list-container", [
                m(map, {
                    store$
                }),
                m(playerList, {
                    store$
                })
            ])
        ])
    }     
}