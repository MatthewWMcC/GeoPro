import m from "mithril";
import { GamePageAttrs, GamePageState } from "./types";
import { model } from "./game-page-model";
import "./game-page.css";

import { nukePartyView } from "./modes/nukeParty/nuke-party-view";
import { capitalProView } from "./modes/capitalPro/capital-pro-view";
import { gameTypeId } from "state/GameData/types";
import { countdownOverlay } from "./components/countdownOverlay/countdown-overlay";

export const gamePage: m.Component<GamePageAttrs, GamePageState> = {
  oninit: model.handleComponentInit,
  onremove: model.handleComponentRemove,
  view: (vnode: m.VnodeDOM<GamePageAttrs, GamePageState>): m.Children => {
    const { store$ } = vnode.attrs;
    const { gameMode, countdown } = vnode.state;

    return m(".out", [
      countdown && m(countdownOverlay, { countdown }),
      gameMode === gameTypeId.CAPITAL_PRO && m(capitalProView, { store$ }),
      gameMode === gameTypeId.NUKE_PARTY && m(nukePartyView, { store$ }),
    ]);
  },
};
