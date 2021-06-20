import m from 'mithril';
import { HeaderAttrs, HeaderState } from './types';

export const header: m.Component<HeaderAttrs, HeaderState> = {
    view: (vnode: m.VnodeDOM<HeaderAttrs, HeaderState>): m.Children => {
        return m("div.header", [
            m("h1.header", "This is the header")
        ])
    }
}