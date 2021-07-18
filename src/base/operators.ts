import { tap, map } from "rxjs/operators"
import m from 'mithril';

export const bindTo = (key: string, vnode: any) => {
    return tap((val: any) => {
        Object.assign(vnode.state, {[key]: val});
        m.redraw();
    }) 
}

export const findObjectWithKeyValuePair = (key: string, val: string) => {
    return map((arr: any) => {
        return arr.filter((element: any) => element[key] === val)[0]
    })
}