import m from "mithril";
import { GameSettingsAttrs, GameSettingsState } from "../types";
import "../game-settings.css";

export const nukePartySettings = (
  vnode: m.VnodeDOM<GameSettingsAttrs, GameSettingsState>
) => {
  return m(".nuke-party-settings-container", []);
};
