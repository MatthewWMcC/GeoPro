import { model } from "./game-waiting-model";
import m from "mithril";
import { GameWaitingAttrs, GameWaitingState } from "./types";
import "./game-waiting.css";
import { gameSettings } from "./gameSettings/game-settings";
import { IconContainer } from "components/iconContainer/icon-container";
import { copyIcon } from "global/constants/icons";

export const gameWaiting: m.Component<GameWaitingAttrs, GameWaitingState> = {
  oninit: model.handleComponentInit,
  onremove: model.handleComponentRemove,
  view: (vnode: m.VnodeDOM<GameWaitingAttrs, GameWaitingState>) => {
    const { playerList, roomURL } = vnode.state;
    const { store$ } = vnode.attrs;
    return m(".game-waiting-container", [
      m(".waiting-top-container", [
        m("label.waiting-label", "Waiting for game to start..."),
      ]),
      m(".game-waiting-outer-panel-container", [
        m(".game-waiting-outer-panel", [
          m(".game-waiting-settings", [m(gameSettings, { store$ })]),
          m(".game-waiting-players", [
            m("label.players-label.sub-heading-label", "Players"),
            m(".player-list-holder", [
              playerList &&
                playerList.map((player) => {
                  return m(".player-holder", [
                    m(IconContainer, {
                      src: player.userIconSrc,
                      size: 30,
                      color: "transparent",
                      borderWidth: 0,
                    }),
                    m("label.player-name", player.username),
                  ]);
                }),
            ]),
          ]),
        ]),
      ]),
      m(".waiting-bottom-game-container", [
        m(".invite-friends-container", [
          m("label", "Invite friends with the link:"),
          m("#copy-url-container", [
            m(
              "button#copy-button",
              {
                onclick: () => model.handleCopyURL(vnode),
              },
              m.trust(copyIcon)
            ),
            m("input.styled-text-input#copy-game-uri", {
              type: "text",
              disabled: true,
              value: roomURL,
            }),
          ]),
        ]),
        m(
          "button.start-game.styled-button",
          {
            onclick: () => model.handleStartButtonPress(vnode),
          },
          "Start Game"
        ),
      ]),
    ]);
  },
};
