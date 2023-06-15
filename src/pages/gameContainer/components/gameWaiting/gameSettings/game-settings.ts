import { model } from "./game-settings-model";
import m from "mithril";
import {
  GameSettingsAttrs,
  GameSettingsState,
  GameSettingsTabs,
  ITabContent,
} from "./types";
import "./game-settings.css";
import { capitalProSettings } from "./views/capital-pro-settings";
import { gameTypeId } from "state/GameData/types";
import { nukePartySettings } from "./views/nuke-party-settings";
import { capitalProHowTo } from "./views/capital-pro-how-to";
import { nukePartyHowTo } from "./views/nuke-party-how-to";

export const gameSettings: m.Component<GameSettingsAttrs, GameSettingsState> = {
  oninit: model.handleComponentInit,
  onremove: model.handleComponentRemove,
  view: (vnode: m.VnodeDOM<GameSettingsAttrs, GameSettingsState>) => {
    const { gameMode, tabSelected } = vnode.state;
    let settings;
    let howToPlay;

    const tabContent: ITabContent[] = [
      { id: GameSettingsTabs.HOW_TO_PLAY, label: "How to Play" },
      { id: GameSettingsTabs.SETTINGS, label: "Settings" },
    ];

    switch (gameMode) {
      case gameTypeId.CAPITAL_PRO:
        settings = capitalProSettings(vnode);
        howToPlay = capitalProHowTo(vnode);
        break;
      case gameTypeId.NUKE_PARTY:
        settings = nukePartySettings(vnode);
        howToPlay = nukePartyHowTo(vnode);
        break;
      default:
        settings = nukePartySettings(vnode);
        howToPlay = nukePartyHowTo(vnode);
    }

    return m(".game-settings-container", [
      m(".tab-header", [
        tabContent.map(({ id, label }) => {
          console.log(id, tabSelected);
          return m(
            `.tab-option${id === tabSelected ? ".selected" : ""}`,
            { onclick: () => model.handleTabChangeClick(vnode, id) },
            label
          );
        }),
      ]),
      m(".content-container", [
        tabSelected === GameSettingsTabs.HOW_TO_PLAY ? howToPlay : settings,
      ]),
    ]);
  },
};

// m(".settings-label.sub-heading-label", "Settings"),
