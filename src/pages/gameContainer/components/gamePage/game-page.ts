import m from 'mithril';
import { GamePageAttrs, GamePageState } from './types';
import { model } from './game-page-model'; 
import {map} from "./components/map/map"
import "./game-page.css"
import { playerList } from './components/player-list/player-list';
import { RoundEndModal } from './components/roundEndModal/round-end-modal';

export const gamePage: m.Component<GamePageAttrs, GamePageState> = {
    oninit: model.handleComponentInit,
    onremove: model.handleComponentRemove,
    oncreate: model.handleComponentCreate,
    view: (vnode: m.VnodeDOM<GamePageAttrs, GamePageState>): m.Children => {
        const {store$} = vnode.attrs;
        const { showRoundEndModal } = vnode.state;
        return  m(".game-page-container",[
            m(".map-and-players-list-container", [
                !showRoundEndModal && m(map, {
                    store$
                }),
                showRoundEndModal && m(RoundEndModal, { store$ }),
                m(playerList, {
                    store$
                }),

                
            ])
        ])
    }     
}