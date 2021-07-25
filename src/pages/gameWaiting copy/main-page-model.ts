import m from 'mithril';
import { MainPageAttrs, MainPageState } from "./types";

interface MainPageModel {
    onComponentInit: (vnode: m.VnodeDOM<MainPageAttrs, MainPageState>) => void;
}

export const model: MainPageModel = {
    onComponentInit: (vnode: m.VnodeDOM<MainPageAttrs, MainPageState>) => {
        
    }
}