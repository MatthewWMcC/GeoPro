import m from 'mithril';
import { initSocketDataSetup } from 'socket/socket-helpers';
import { MainPageAttrs, MainPageState } from "./types";
import uniqid from 'uniqid';

interface MainPageModel {
    handleComponentInit: (vnode: m.VnodeDOM<MainPageAttrs, MainPageState>) => void;
    handleMakeNewGamePress: (vnode: m.VnodeDOM<MainPageAttrs, MainPageState>) => void;
}

export const model: MainPageModel = {
    handleComponentInit: (vnode: m.VnodeDOM<MainPageAttrs, MainPageState>) => {
        const {store$} = vnode.attrs;

        initSocketDataSetup(store$);
    },
    handleMakeNewGamePress: (vnode: m.VnodeDOM<MainPageAttrs, MainPageState>) => {
        m.route.set(`/game-container/${uniqid()}`)
    }
}