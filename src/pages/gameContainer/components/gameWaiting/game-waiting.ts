import { model } from "./game-waiting-model";
import m from 'mithril';
import { GameWaitingAttrs, GameWaitingState } from './types';

export const gameWaiting: m.Component<GameWaitingAttrs, GameWaitingState> = {
    oninit: model.handleComponentInit,
    onremove: model.handleComponentRemove,
    view: (vnode: m.VnodeDOM<GameWaitingAttrs, GameWaitingState>) => {
        const { playerList, roomId} = vnode.state;
        console.log(playerList, roomId)
        return m(".game-waiting-container", [
            m(".waiting-label", "waiting page"),
            m("button.start-game", {
                onclick: () => model.handleStartButtonPress(vnode)
            }, "Start Game"),
            m(".waiting-list", [
                playerList && playerList.map((player) => {
                   return m("label.waiting-player", `${player.username}`)
                })
            ]),
            m(".roomId", roomId)
        ])
    }
}