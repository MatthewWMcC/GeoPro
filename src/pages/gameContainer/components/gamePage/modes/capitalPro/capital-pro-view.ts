import m from "mithril";
import { CapitalProAttrs, CapitalProState } from "./types";
import { model } from "./capital-pro-model";
import { map } from "./components/map/map";
import "./capital-pro.css";
import { playerList } from "./components/player-list/player-list";
import { RoundEndModal } from "./components/roundEndModal/round-end-modal";
import { capitialProViewStates } from "state/GameData/modes/CapitalProData/types";
import { GameViewStates } from "state/GameData/types";

export const capitalProView: m.Component<CapitalProAttrs, CapitalProState> = {
  oninit: model.handleComponentInit,
  onremove: model.handleComponentRemove,
  oncreate: model.handleComponentCreate,
  view: (vnode: m.VnodeDOM<CapitalProAttrs, CapitalProState>): m.Children => {
    const { store$ } = vnode.attrs;
    const { viewState, winningPlayer, gameMode } = vnode.state;

    return m(".game-page-container", [
      m(".map-and-players-list-container", [
        viewState === GameViewStates.IN_GAME &&
          m(map, {
            store$,
          }),
        viewState === capitialProViewStates.ROUND_END_MODAL &&
          m(RoundEndModal, { store$ }),
        viewState === capitialProViewStates.GAME_END &&
          m(".game-end-container", [
            m(".inner-game-end-container", [
              winningPlayer &&
                m("#game-end-message-container", [
                  m(
                    "h1.game-end-message",
                    `Game over. ${winningPlayer.username} has won with a score of ${winningPlayer.score}.`
                  ),
                ]),
              m(".buttons-container", [
                m(
                  "button.secondary-styled-button.end-game-button",
                  {
                    onclick: () => model.handleOnReturnClick(),
                  },
                  "Return to Menu"
                ),
                m(
                  "button.styled-button.end-game-button",
                  {
                    onclick: () => model.handleOnRestartClick(),
                  },
                  "Play Again"
                ),
              ]),
            ]),
          ]),
        m(playerList, {
          store$,
        }),
      ]),
    ]);
  },
};
