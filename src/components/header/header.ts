import m from 'mithril';
import { model } from './header-model';
import { HeaderAttrs, HeaderState } from './types';

export const header: m.Component<HeaderAttrs, HeaderState> = {
    oninit: model.handleComponentInit,
    view: (vnode: m.VnodeDOM<HeaderAttrs, HeaderState>): m.Children => {
        const {username} = vnode.state;
        return m("div.header", [
            m("h1.header", "This is the header"),
            m("h2", username),
        ])
    }
}