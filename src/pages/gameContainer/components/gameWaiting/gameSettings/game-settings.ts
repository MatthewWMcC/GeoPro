import { model } from "./game-settings-model";
import m from "mithril";
import { GameSettingsAttrs, GameSettingsState } from "./types";
import "./game-settings.css";
import { capitalProSettings } from "./views/capital-pro-settings";
import { gameTypeId } from "state/GameData/types";
import { nukePartySettings } from "./views/nuke-party-settings";

export const gameSettings: m.Component<GameSettingsAttrs, GameSettingsState> = {
  oninit: model.handleComponentInit,
  onremove: model.handleComponentRemove,
  view: (vnode: m.VnodeDOM<GameSettingsAttrs, GameSettingsState>) => {
    const { gameMode } = vnode.state;
    let settings;
    switch (gameMode) {
      case gameTypeId.CAPITAL_PRO:
        settings = capitalProSettings(vnode);
        break;
      case gameTypeId.NUKE_PARTY:
        settings = nukePartySettings(vnode);
        break;
      default:
        settings = nukePartySettings(vnode);
    }

    return m(".game-settings-container", [
      m("label.settings-label.sub-heading-label", "Settings"),
      settings,
    ]);
  },
};
