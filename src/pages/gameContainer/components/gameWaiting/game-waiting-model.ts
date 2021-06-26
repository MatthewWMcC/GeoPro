import { extendBaseModel } from 'base/baseModel';
import m from 'mithril';
import { GameWaitingAttrs, GameWaitingState } from "./types";

interface GameWaitingModel {
    handleComponentInit: (vnode: m.VnodeDOM<GameWaitingAttrs, GameWaitingState>) => void;
    handleComponentRemove: (vnode: m.VnodeDOM<GameWaitingAttrs, GameWaitingState>) => void;
}

export const model: GameWaitingModel = extendBaseModel({
    handleComponentInit: (vnode: m.VnodeDOM<GameWaitingAttrs, GameWaitingState>) => {
        vnode.state.subscriptions = [];
    }
})