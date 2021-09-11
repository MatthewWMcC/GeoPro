import { model } from "./game-settings-model";
import m from "mithril";
import { GameSettingsAttrs, GameSettingsState } from "./types";
import "./game-settings.css";
import { capitalProSettings } from "./views/capital-pro-settings";
import { gameTypeId } from "state/GameData/types";

export const gameSettings: m.Component<GameSettingsAttrs, GameSettingsState> = {
  oninit: model.handleComponentInit,
  onremove: model.handleComponentRemove,
  view: (vnode: m.VnodeDOM<GameSettingsAttrs, GameSettingsState>) => {
    const { resultsToChooseFrom, maxCountdown, guessLimit, gameMode } =
      vnode.state;

    let settings;
    switch (gameMode) {
      case gameTypeId.CAPITAL_PRO:
        settings = capitalProSettings(vnode);
      default:
        settings = capitalProSettings(vnode);
    }

    return m(".game-settings-container", [
      m("label.settings-label.sub-heading-label", "Settings"),
      settings,
    ]);
  },
};
