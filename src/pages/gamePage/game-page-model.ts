import { GamePageAttrs, GamePageState } from "./types";
import m from "mithril";
import { tap, pluck, distinctUntilChanged } from "rxjs/operators";
import { store } from "state/store";


interface GamePageModel {
    handleComponentInit: (vnode: m.VnodeDOM<GamePageAttrs, GamePageState>) => void;
    handleComponentCreate: (vnode: m.VnodeDOM<GamePageAttrs, GamePageState>) => void;
} 

export const model: GamePageModel = {
    handleComponentInit: (vnode: m.VnodeDOM<GamePageAttrs, GamePageState>) => {
        
    },
    handleComponentCreate: (vnode: m.VnodeDOM<GamePageAttrs, GamePageState>) => {
    }
}