import { tap } from "rxjs/operators"

export const bindTo = (key: string, vnode: any) => {
    return tap((val: any) => {
        Object.assign(vnode.state, {[key]: val})
    }) 
}