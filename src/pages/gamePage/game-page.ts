import m from 'mithril';
import { GamePageAttrs, GamePageState } from './types';

export const gamePage: m.Component<GamePageAttrs, GamePageState> = {
    view: (vnode: m.VnodeDOM<GamePageAttrs, GamePageState>): m.Children => {
        return  m(".game-page-container",[
            m("h2", "game page dudes")
        ])
    }     
}