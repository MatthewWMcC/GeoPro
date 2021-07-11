import m from 'mithril';
import { model } from './header-model';
import { HeaderAttrs, HeaderState } from './types';
import "./header.css"

export const header: m.Component<HeaderAttrs, HeaderState> = {
    oninit: model.handleComponentInit,
    onremove: model.handleComponentRemove,
    view: (vnode: m.VnodeDOM<HeaderAttrs, HeaderState>): m.Children => {
        const {username} = vnode.state;
        return m("div.header", [
            m(".header-label-container", {
                onclick: () => model.handleLogoClick(vnode)
            },[
                m("label.header-label", "Geo Pro"),
            ]),
            m(".header-username-container", [
                m("label.username", username),
            ])
        ])
    }
}