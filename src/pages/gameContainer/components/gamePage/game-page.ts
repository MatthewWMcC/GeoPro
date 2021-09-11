import m from "mithril";
import { GamePageAttrs, GamePageState } from "./types";
import { model } from "./game-page-model";
import "./game-page.css";

import { nukePartyView } from "./modes/nukeParty/nuke-party-view";
import { capitalProView } from "./modes/capitalPro/capital-pro-view";
import { gameTypeId } from "state/GameData/types";

export const gamePage: m.Component<GamePageAttrs, GamePageState> = {
  oninit: model.handleComponentInit,
  onremove: model.handleComponentRemove,
  view: (vnode: m.VnodeDOM<GamePageAttrs, GamePageState>): m.Children => {
    const { store$ } = vnode.attrs;
    const { gameMode } = vnode.state;

    if (gameMode === gameTypeId.CAPITAL_PRO) {
      return m(capitalProView, { store$ });
    } else if (gameMode === gameTypeId.NUKE_PARTY) {
      return m(nukePartyView, { store$ });
    } else {
      return;
    }
  },
};
