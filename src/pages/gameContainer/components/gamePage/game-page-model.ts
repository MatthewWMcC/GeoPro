import { GamePageAttrs, GamePageState } from "./types";
import m from "mithril";
import { tap, pluck, distinctUntilChanged } from "rxjs/operators";
import { store } from "state/store";
import { extendBaseModel } from "base/baseModel";


interface GamePageModel {
    handleComponentInit: (vnode: m.VnodeDOM<GamePageAttrs, GamePageState>) => void;
    handleComponentRemove: (vnode: m.VnodeDOM<GamePageAttrs, GamePageState>) => void;
    handleComponentCreate: (vnode: m.VnodeDOM<GamePageAttrs, GamePageState>) => void;
} 

export const model: GamePageModel = extendBaseModel({
    handleComponentInit: (vnode: m.VnodeDOM<GamePageAttrs, GamePageState>) => {
        vnode.state.subscriptions = [];
    },
    handleComponentCreate: (vnode: m.VnodeDOM<GamePageAttrs, GamePageState>) => {
    }
})