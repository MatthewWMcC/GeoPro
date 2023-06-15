import m from "mithril";
import { GameSettingsAttrs, GameSettingsState } from "../types";
import "../game-settings.css";

export const capitalProHowTo = (
  vnode: m.VnodeDOM<GameSettingsAttrs, GameSettingsState>
) => {
  return m(".capital-pro-how-to-container", [
    m("h4", "Welcome to Capital Pro!"),
    m(
      "label.block",
      "Guess the location of various global cities to earn points and compete against your friends."
    ),
    m("br"),
    m(
      "label.block",
      "Use multiple guesses to hone in on the correct location, only the closest guess will be used."
    ),
    m("img.how-to-img", {
      src: "https://storage.googleapis.com/geopro-324602.appspot.com/capital-pro-game-icon.jpeg",
    }),
  ]);
};
