import m from 'mithril';
import { EnterInfoAttrs, EnterInfoState } from './types';
import { store } from "state/store";
import { UpdateUsername } from 'state/UserData/actions';
import { extendBaseModel } from 'base/baseModel';

interface EnterInfoModel {
    handleComponentInit: (vnode: m.VnodeDOM<EnterInfoAttrs, EnterInfoState>) => void;
    handleComponentRemove: (vnode: m.VnodeDOM<EnterInfoAttrs, EnterInfoState>) => void;
    handleUsernameChange: (vnode: m.VnodeDOM<EnterInfoAttrs, EnterInfoState>, event: any) => void;
}

export const model: EnterInfoModel = extendBaseModel({
    handleComponentInit: (vnode: m.VnodeDOM<EnterInfoAttrs, EnterInfoState>) => {
        vnode.state.subscriptions = [];
    },
    handleUsernameChange: (vnode: m.VnodeDOM<EnterInfoAttrs, EnterInfoState>, event: any) => {
        const username = event.target.value;
        store.dispatch(UpdateUsername(username));
    }
})

