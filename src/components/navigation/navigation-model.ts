import m from 'mithril';
import { NavigationAttrs, NavigationState } from './types';

interface NavigationModel {
    handleComponentInit: (vnode: m.VnodeDOM<NavigationAttrs, NavigationState>) => void;
}

export const model: NavigationModel = {
    handleComponentInit: (vnode: m.VnodeDOM<NavigationAttrs, NavigationState>) => {
        
    }
}
