import m from "mithril";
import { PlayerListAttrs, PlayerListState } from "./types";
import { model } from "./player-list-model";
import "./player-list.css";
import { earthIconSVG, heartSVG } from "global/constants/icons";
import { IconContainer } from "components/iconContainer/icon-container";
import { playerType } from "state/GameData/types";
import { store } from "state/store";
import { nukeImageView } from "../../modes/nukeParty/components/nuke-image/nuke-image";

export const playerList: m.Component<PlayerListAttrs, PlayerListState> = {
  oninit: model.handleComponentInit,
  onremove: model.handleComponentRemove,
  oncreate: model.handleComponentCreate,
  view: (vnode: m.VnodeDOM<PlayerListAttrs, PlayerListState>): m.Children => {
    const { playerList, turnUserId, nukeColor } = vnode.state;

    return m("#player-list-outer", [
      playerList &&
        playerList.map((player: playerType) => {
          const lives = Array(player.lives).fill(0);

          return m(".player-container-v2", [
            turnUserId === player.userId &&
              m(".nuke-image-placement", [
                m(nukeImageView, { color: nukeColor }),
              ]),
            m(".main-player-content", [
              m(".name-container", [m("label.player-name", player.username)]),
              m(".middle-player-container", [
                m(".player-message", [
                  m(
                    "label.player-message-text",
                    "test messagefffffffffffffffffffffffff"
                  ),
                ]),

                m(IconContainer, {
                  src: player.userIconSrc,
                  size: 50,
                  color: "transparent",
                  borderWidth: 0,
                }),
              ]),
              m(".lives-container", [
                lives.map((_, i) => {
                  return m(".heart", [m.trust(heartSVG)]);
                }),
              ]),
            ]),
          ]);
        }),
    ]);

    // return m(".player-list-outer-container", [
    //   playerList &&
    //     playerList.map((player) => {
    //       // return m(".player-container", [
    //       //   m(".outer-icon-container", [
    //       //     m(IconContainer, {
    //       //       src: player.userIconSrc,
    //       //       size: 50,
    //       //       color: "transparent",
    //       //       borderWidth: 0,
    //       //     }),
    //       //   ]),
    //       //   m(".side-container", [
    //       //     m(".top-container", [
    //       //       m("label.player-username", player.username),
    //       //     ]),
    //       //     m(".bottom-container", [
    //       //       m(".score-container", [m("label.player-score", player.score)]),
    //       //       m(".guesses-container", [
    //       //         Array.from(Array(player.guessNum), (e, key) => {
    //       //           return m(".guess-dot", { key }, [m.trust(earthIconSVG)]);
    //       //         }),
    //       //       ]),
    //       //     ]),
    //       //   ]),
    //       // ]);
    //     }),
    // ]);
  },
};
