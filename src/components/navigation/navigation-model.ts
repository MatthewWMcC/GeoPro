import m from 'mithril';
import { store } from 'state/store';
import { UpdateMapStyle } from 'state/UserData/actions';
import { MapStylesKey } from 'state/UserData/types';
import { NavigationAttrs, NavigationState } from './types';

interface NavigationModel {
    handleComponentInit: (vnode: m.VnodeDOM<NavigationAttrs, NavigationState>) => void;
    handleMapStyleChange: (mapStyleChange: MapStylesKey) => void;
}

export const model: NavigationModel = {
    handleComponentInit: (vnode: m.VnodeDOM<NavigationAttrs, NavigationState>) => {
        vnode.state.navShown = false;
    },
    handleMapStyleChange: (mapStyleChange: MapStylesKey) => {
        store.dispatch(UpdateMapStyle(mapStyleChange));
    }
}
