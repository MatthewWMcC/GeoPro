import { GamePageAttrs, GamePageState } from "./types";
import m from "mithril";
import { store } from "state/store";


interface GamePageModel {
    handleComponentCreate: (vnode: m.VnodeDOM<GamePageAttrs, GamePageState>) => void;
} 

export const model: GamePageModel = {
    handleComponentCreate: (vnode: m.VnodeDOM<GamePageAttrs, GamePageState>) => {
        console.log(store.getState())
    }
}