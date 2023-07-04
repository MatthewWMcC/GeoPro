import m from "mithril";
import { PlayerListAttrs, PlayerListState } from "./types";
import { model } from "./player-list-model";
import "./player-list.css";
import { heartSVG } from "global/constants/icons";
import { IconContainer } from "components/iconContainer/icon-container";
import { playerType } from "state/GameData/types";
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
              m(".name-container", [m("label", player.username)]),
              m(".middle-player-container", [
                m(IconContainer, {
                  src: player.userIconSrc,
                  size: 70,
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
  },
};
