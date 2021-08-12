import { model } from './game-container-model';
import m from 'mithril';
import { GameContainerAttrs, GameContainerState } from './types';
import { gameWaiting } from './components/gameWaiting/game-waiting';
import { gamePage } from './components/gamePage/game-page';
import "./game-container.css"

export const gameContainer: m.Component<GameContainerAttrs, GameContainerState> = {
    oninit: model.handleComponentInit,
    onremove: model.handleComponentRemove,
    view: (vnode: m.VnodeDOM<GameContainerAttrs, GameContainerState>) => {
        const { inGame, doneLoading } = vnode.state;
        const { store$, roomId} = vnode.attrs;
        if(!doneLoading){
            return m("#loading-modal-background", [
                m("#loading-container", [
                    m("#loading-wheel")
                ])
            ])
        } else {
            return m(".game-container-container", [
                !inGame && m(gameWaiting, {store$}),
                inGame && m(gamePage, {store$})
            ])
        }
    }
}