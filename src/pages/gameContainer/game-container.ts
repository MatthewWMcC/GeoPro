import { model } from "./game-container-model";
import m from "mithril";
import { GameContainerAttrs, GameContainerState } from "./types";
import { gameWaiting } from "./components/gameWaiting/game-waiting";
import { gamePage } from "./components/gamePage/game-page";
import { GameViewStates } from "state/GameData/types";
import { loadingModal } from "components/loadingModal/loading-modal";
import "./game-container.css";
import { store } from "state/store";

export const gameContainer: m.Component<
  GameContainerAttrs,
  GameContainerState
> = {
  oninit: model.handleComponentInit,
  onremove: model.handleComponentRemove,
  view: (vnode: m.VnodeDOM<GameContainerAttrs, GameContainerState>) => {
    const { viewState, GameViewState } = vnode.state;
    const { store$ } = vnode.attrs;

    const refreshLink = {
      view: () =>
        m(
          "a#refresh-link.inline-link",
          {
            onclick: () => location.reload(),
          },
          "Refreshing"
        ),
    };

    const returnToMainLink = {
      view: () =>
        m(
          "a#return-to-main-link.inline-link",
          {
            onclick: () => m.route.set("/"),
          },
          "Return to Main"
        ),
    };

    if (GameViewState === GameViewStates.LOADING) {
      return m(loadingModal);
    } else if (GameViewState === GameViewStates.ROOM_NOT_FOUND) {
      return m("#modal-background", [
        m("#room-not-found-container", [
          m("h2#room-not-found-message", [
            m("label.message", "Room not found. Try "),
            m(refreshLink),
            m("label.message", " or "),
            m(returnToMainLink),
          ]),
        ]),
      ]);
    } else if (GameViewState === GameViewStates.DUPLICATE_PLAYER_IN_ROOM) {
      return m("#modal-background", [
        m("#duplicate-user-container", [
          m("h2#duplicate-player-message", [
            m(
              "label.message",
              "Player cannot join the same game multiple times."
            ),
          ]),
        ]),
      ]);
    } else if (GameViewState === GameViewStates.CANNOT_JOIN_ROOM) {
      return m("#modal-background", [
        m("h2.text-center", [
          m("label.message", store.getState().GameData.message),
          m("br"),
          m(returnToMainLink),
        ]),
      ]);
    } else {
      return m(".game-container-container", [
        viewState === GameViewStates.WAITING
          ? m(gameWaiting, { store$ })
          : m(gamePage, { store$ }),
      ]);
    }
  },
};
