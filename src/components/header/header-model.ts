import m from 'mithril';
import { HeaderAttrs, HeaderState } from "./types";
import { tap, pluck, distinctUntilChanged } from "rxjs/operators";
import { extendBaseModel } from 'base/baseModel';

interface HeaderModel {
    handleComponentRemove: (vnode: m.VnodeDOM<HeaderAttrs, HeaderState>) => void;
    handleComponentInit: (vnode: m.VnodeDOM<HeaderAttrs, HeaderState>) => void;
}

export const model: HeaderModel = extendBaseModel({
    handleComponentInit: (vnode: m.VnodeDOM<HeaderAttrs, HeaderState>) => {
        const {store$} = vnode.attrs;
        vnode.state.subscriptions = [];

        vnode.state.subscriptions.push(
            store$.pipe(
                pluck("UserData", "username"),
                distinctUntilChanged(),
                tap(username => {
                    vnode.state.username = username;
                })
            ).subscribe()
        )        
    }
})