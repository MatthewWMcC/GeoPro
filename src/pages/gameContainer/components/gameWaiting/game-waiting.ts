import { model } from 'components/header/header-model';
import m from 'mithril';
import { GameWaitingAttrs, GameWaitingState } from './types';

export const gameWaiting: m.Component<GameWaitingAttrs, GameWaitingState> = {
    oninit: model.handleComponentInit,
    onremove: model.handleComponentRemove,
    view: (vnode: m.VnodeDOM<GameWaitingAttrs, GameWaitingState>) => {
        return m(".game-waiting-container", [
            m(".waiting-label", "waiting page")
        ])
    }
}