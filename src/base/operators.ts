import { tap } from "rxjs/operators"
import m from 'mithril';

export const bindTo = (key: string, vnode: any) => {
    return tap((val: any) => {
        Object.assign(vnode.state, {[key]: val});
        m.redraw();
    }) 
}