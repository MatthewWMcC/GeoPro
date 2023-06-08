import m from "mithril";
import { model } from "./main-page-model";
import { MainPageAttrs, MainPageState } from "./types";
import "./main-page.css";
import { gameModeList } from "global/constants/game-modes";
import { playerIcon, searchSVG } from "global/constants/icons";
import { IconContainer } from "components/iconContainer/icon-container";

export const mainPage: m.Component<MainPageAttrs, MainPageState> = {
  oninit: model.handleComponentInit,
  oncreate: model.handleComponentCreate,
  view: (vnode: m.VnodeDOM<MainPageAttrs, MainPageState>) => {
    return m("#main-page-container", [
      m(
        "h2.main-page-label",
        "Welcome to Geo Pro. Select a game mode to start a new game or enter a friends game url here."
      ),
      m("#url-enter-container", [
        m("input.styled-text-input#enter-game-uri", {
          type: "text",
          placeholder: "Enter a game url here...",
          oninput: (e) => {
            vnode.state.roomURI = e.target.value;
          },
          onkeypress: (e) => {
            if (e.keyCode === 13) {
              model.handleGoToRoom(vnode);
            }
          },
        }),
        m(
          "button#submit-url-button",
          {
            onclick: () => model.handleGoToRoom(vnode),
          },
          m.trust(searchSVG)
        ),
      ]),
      m("#game-mode-list", [
        gameModeList.map((gameMode) => {
          return m(
            ".game-mode-outer-container",
            {
              onclick: () => model.handleMakeNewGamePress(vnode, gameMode.id),
            },
            [
              m(".game-mode-upper-container", [
                m(".game-mode-icon-container", [
                  m(IconContainer, {
                    src: gameMode.iconSrc,
                    size: 50,
                    color: "orange",
                    borderWidth: 4,
                  }),
                ]),

                m(".game-mode-name-container", [
                  m("h3.game-mode-name", gameMode.name),
                ]),
                m(".game-mode-num-container", [
                  m(".player-icon", [m.trust(playerIcon)]),
                  m(".game-mode-num", gameMode.numOfPlayers),
                ]),
              ]),
              m(".game-mode-lower-container", [
                m(".game-mode-description-container", [
                  m("p.game-mode-description", gameMode.description),
                ]),
              ]),
            ]
          );
        }),
      ]),
    ]);
  },
};
