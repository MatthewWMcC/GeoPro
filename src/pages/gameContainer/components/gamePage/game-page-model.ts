import { GamePageAttrs, GamePageState } from "./types";
import m from "mithril";
import { tap, pluck, distinctUntilChanged } from "rxjs/operators";
import { store } from "state/store";
import { extendBaseModel } from "base/baseModel";
import { bindTo } from "base/operators";


interface GamePageModel {
    handleComponentInit: (vnode: m.VnodeDOM<GamePageAttrs, GamePageState>) => void;
    handleComponentRemove: (vnode: m.VnodeDOM<GamePageAttrs, GamePageState>) => void;
    handleComponentCreate: (vnode: m.VnodeDOM<GamePageAttrs, GamePageState>) => void;
} 

export const model: GamePageModel = extendBaseModel({
    handleComponentInit: (vnode: m.VnodeDOM<GamePageAttrs, GamePageState>) => {
        const { store$ } = vnode.attrs;
        vnode.state.subscriptions = [];

        vnode.state.subscriptions.push(
            store$.pipe(
                pluck("CurrentPageData", "showRoundEndModal"),
                distinctUntilChanged(),
                bindTo("showRoundEndModal", vnode)
            ).subscribe()
        )
    },
    handleComponentCreate: (vnode: m.VnodeDOM<GamePageAttrs, GamePageState>) => {
    }
})