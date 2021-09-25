import m from "mithril";
import { PlayerListAttrs, PlayerListState } from "./types";
import { model } from "./player-list-model";
import "./player-list.css";
import { earthIconSVG } from "global/constants/icons";
import { IconContainer } from "components/iconContainer/icon-container";

export const playerList: m.Component<PlayerListAttrs, PlayerListState> = {
  oninit: model.handleComponentInit,
  onremove: model.handleComponentRemove,
  oncreate: model.handleComponentCreate,
  view: (vnode: m.VnodeDOM<PlayerListAttrs, PlayerListState>): m.Children => {
    const { playerList } = vnode.state;

    return m(".player-list-outer-container", [
      playerList &&
        playerList.map((player) => {
          return m(".player-container", [
            m(".outer-icon-container", [
              m(IconContainer, {
                src: player.userIconSrc,
                size: 50,
                color: "transparent",
                borderWidth: 0,
              }),
            ]),
            m(".side-container", [
              m(".top-container", [
                m("label.player-username", player.username),
              ]),
              m(".bottom-container", [
                m(".score-container", [m("label.player-score", player.score)]),
                m(".guesses-container", [
                  Array.from(Array(player.guessNum), (e, key) => {
                    return m(".guess-dot", { key }, [m.trust(earthIconSVG)]);
                  }),
                ]),
              ]),
            ]),
          ]);
        }),
    ]);
  },
};
