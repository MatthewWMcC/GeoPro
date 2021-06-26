import { model } from './game-container-model';
import m from 'mithril';
import { GameContainerAttrs, GameContainerState } from './types';
import { gameWaiting } from './components/gameWaiting/game-waiting';
import { gamePage } from './components/gamePage/game-page';

export const gameContainer: m.Component<GameContainerAttrs, GameContainerState> = {
    oninit: model.handleComponentInit,
    onremove: model.handleComponentRemove,
    view: (vnode: m.VnodeDOM<GameContainerAttrs, GameContainerState>) => {
        const { gamePlaying } = vnode.state;
        const { store$, gameId} = vnode.attrs;

        return m(".game-container-container", [
            !gamePlaying && m(gameWaiting, {store$}),
            gamePlaying && m(gamePage, {store$})
        ])
    }
}