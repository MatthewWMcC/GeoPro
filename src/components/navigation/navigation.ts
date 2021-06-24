import m from 'mithril';
import { NavigationAttrs, NavigationState } from './types';

export const navigation: m.Component<NavigationAttrs, NavigationState> = {
    view: (vnode: m.VnodeDOM<NavigationAttrs, NavigationState>): m.Children => {
        return(
            m(".navigation-head-container", [

            ])
        )
    }   
}
