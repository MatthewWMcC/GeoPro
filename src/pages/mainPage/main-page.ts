import m from 'mithril';
import { model } from './main-page-model';
import { MainPageAttrs, MainPageState } from './types';

export const mainPage: m.Component<MainPageAttrs, MainPageState> = {
    oninit: model.handleComponentInit,
    view: (vnode: m.VnodeDOM<MainPageAttrs, MainPageState>) => {
        return m(".main-page-container", [
            m("h3.main-page-label", "Main page label."),
            m("button.temp-button", {   
                onclick: model.handleMakeNewGamePress
            }, "make new game")
        ])
    }
}