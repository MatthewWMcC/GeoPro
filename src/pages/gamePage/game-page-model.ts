import { GamePageAttrs, GamePageState } from "./types";
import m from "mithril";

interface GamePageModel {
    handleComponentCreate: (vnode: m.VnodeDOM<GamePageAttrs, GamePageState>) => void;
} 

export const model: GamePageModel = {
    handleComponentCreate: (vnode: m.VnodeDOM<GamePageAttrs, GamePageState>) => {
        
    }
}