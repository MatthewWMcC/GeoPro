import m from 'mithril';
import { PlayerListAttrs, PlayerListState } from './types';
import { model } from './player-list-model'; 
import "./player-list.css"

export const playerList: m.Component<PlayerListAttrs, PlayerListState> = {
    oninit: model.handleComponentInit,
    onremove: model.handleComponentRemove,
    oncreate: model.handleComponentCreate,
    view: (vnode: m.VnodeDOM<PlayerListAttrs, PlayerListState>): m.Children => {
        const {playerList} = vnode.state;

        return  m(".player-list-outer-container", [
            playerList && playerList.map(player => {
                return m(".player-container", [
                    m("label.player-username", player.username),
                    m("label.player-score", player.score),
                    m("label.guess-num", player.guessNum)
                ])
            })
        ])
    }     
}