import m from 'mithril';
import { EnterInfoAttrs, EnterInfoState } from './types';
import { store } from "state/store";
import { UpdateUsername } from 'state/UserData/actions';

interface EnterInfoModel {
    handleComponentInit: (vnode: m.VnodeDOM<EnterInfoAttrs, EnterInfoState>) => void;
    handleUsernameChange: (vnode: m.VnodeDOM<EnterInfoAttrs, EnterInfoState>, event: any) => void;
}

export const model: EnterInfoModel = {
    handleComponentInit: (vnode: m.VnodeDOM<EnterInfoAttrs, EnterInfoState>) => {
        
    },
    handleUsernameChange: (vnode: m.VnodeDOM<EnterInfoAttrs, EnterInfoState>, event: any) => {
        const username = event.target.value;
        store.dispatch(UpdateUsername(username));
    }
}

