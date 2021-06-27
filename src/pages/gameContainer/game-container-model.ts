import { extendBaseModel } from 'base/baseModel';
import m from 'mithril';
import { GameContainerAttrs, GameContainerState } from "./types";

interface GameContainerModel {
    handleComponentInit: (vnode: m.VnodeDOM<GameContainerAttrs, GameContainerState>) => void;
    handleComponentRemove: (vnode: m.VnodeDOM<GameContainerAttrs, GameContainerState>) => void;
}

export const model: GameContainerModel = extendBaseModel({
    handleComponentInit: (vnode: m.VnodeDOM<GameContainerAttrs, GameContainerState>) => {
        vnode.state.gamePlaying = true;
        vnode.state.subscriptions = [];
    }
})