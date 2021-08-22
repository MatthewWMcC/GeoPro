import { model } from './game-container-model';
import m from 'mithril';
import { GameContainerAttrs, GameContainerState } from './types';
import { gameWaiting } from './components/gameWaiting/game-waiting';
import { gamePage } from './components/gamePage/game-page';
import "./game-container.css"
import { capitialProViewStates } from 'state/capitalProData/types';
import { GameViewStates } from 'state/GameData/types';

export const gameContainer: m.Component<GameContainerAttrs, GameContainerState> = {
    oninit: model.handleComponentInit,
    onremove: model.handleComponentRemove,
    view: (vnode: m.VnodeDOM<GameContainerAttrs, GameContainerState>) => {
        const { viewState, GameViewState } = vnode.state;
        const { store$} = vnode.attrs;

        const refreshLink = {
            view: () => 
                m("a#refresh-link.inline-link", {
                    onclick: () => location.reload()
                }, "Refreshing")
        }

        const returnToMainLink = {
            view: () =>  
                m("a#return-to-main-link.inline-link", {
                    onclick: () => m.route.set("/main-page")
                }, "Return to Main")
        }

        if(GameViewState === GameViewStates.LOADING){
            return m("#modal-background", [
                m("#loading-container", [
                    m("#loading-wheel")
                ])
            ])
        } else if(GameViewState === GameViewStates.ROOM_NOT_FOUND){
            return m("#modal-background", [
                m("#room-not-found-container",[
                    m("h2#room-not-found-message", [
                        m("label.message", 'Room not found. Try '),
                        m(refreshLink),
                        m("label.message", ' or '),
                        m(returnToMainLink)
                    ])
                ])
            ])
        }else{
            return m(".game-container-container", [
                (viewState === capitialProViewStates.WAITING) ? 
                    m(gameWaiting, {store$}) : 
                    m(gamePage, {store$})
                
            ])
        }
    }
}