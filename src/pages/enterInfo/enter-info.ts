import m from 'mithril';
import { EnterInfoAttrs, EnterInfoState } from './types';

export const enterInfo: m.Component<EnterInfoAttrs, EnterInfoState> = {
    view: (vnode: m.VnodeDOM<EnterInfoAttrs, EnterInfoState>): m.Children => {
        return  m(".game-page-container",[
            m("h2", "enter info"),
            m("button.enter-info-button", {
                onclick: () => {
                    m.route.set("game-page")
                }
            }, "Switch to game page")
        ])
    }     
}