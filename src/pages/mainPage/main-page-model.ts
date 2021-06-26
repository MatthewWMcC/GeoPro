import m from 'mithril';
import { MainPageAttrs, MainPageState } from "./types";

interface MainPageModel {
    handleComponentInit: (vnode: m.VnodeDOM<MainPageAttrs, MainPageState>) => void;
}

export const model: MainPageModel = {
    handleComponentInit: (vnode: m.VnodeDOM<MainPageAttrs, MainPageState>) => {
        
    }
}