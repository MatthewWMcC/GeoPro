import m from "mithril";
import { GamePageAttrs, GamePageState } from "./types";
import { model } from "./game-page-model";
import { map } from "./components/map/map";
import "./game-page.css";
import { playerList } from "./components/player-list/player-list";
import { RoundEndModal } from "./components/roundEndModal/round-end-modal";
import { capitialProViewStates } from "state/capitalProData/types";

export const gamePage: m.Component<GamePageAttrs, GamePageState> = {
  oninit: model.handleComponentInit,
  onremove: model.handleComponentRemove,
  oncreate: model.handleComponentCreate,
  view: (vnode: m.VnodeDOM<GamePageAttrs, GamePageState>): m.Children => {
    const { store$ } = vnode.attrs;
    const { viewState, winningPlayer } = vnode.state;

    return m(".game-page-container", [
      m(".map-and-players-list-container", [
        viewState === capitialProViewStates.IN_GAME &&
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
