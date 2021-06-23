import m from 'mithril';
import { HeaderAttrs, HeaderState } from "./types";
import { pipe } from "rxjs";
import { tap, pluck, distinctUntilChanged } from "rxjs/operators";

interface HeaderModel {
    handleComponentRemove: (vnode: m.VnodeDOM<HeaderAttrs, HeaderState>) => void;
    handleComponentInit: (vnode: m.VnodeDOM<HeaderAttrs, HeaderState>) => void;
}

export const model: HeaderModel = {
    handleComponentRemove: (vnode: m.VnodeDOM<HeaderAttrs, HeaderState>) => {
        vnode.state.subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        })
        vnode.state.subscriptions = [];
    },
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
}