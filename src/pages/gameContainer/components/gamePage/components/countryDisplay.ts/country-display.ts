import m from "mithril";
import { CountryDisplayAttrs, CountryDisplayState } from "./types";
import "./country-display.css";
import { guessStatus as guessStatusEnum } from "state/GameData/modes/NukePartyData/types";
import { checkmarkGreenIcon, lockIcon, XRedIcon } from "global/constants/icons";

export const countryDisplay: m.Component<
  CountryDisplayAttrs,
  CountryDisplayState
> = {
  view: (vnode: m.VnodeDOM<CountryDisplayAttrs, CountryDisplayState>) => {
    const { name, countryCode, guessStatus } = vnode.attrs;

    let guessStatusIcon = null;
    switch (guessStatus) {
      case guessStatusEnum.CORRECT:
        guessStatusIcon = m.trust(checkmarkGreenIcon);
        break;
      case guessStatusEnum.DUPLICATE:
        guessStatusIcon = m.trust(lockIcon);
        break;
      case guessStatusEnum.WRONG:
        guessStatusIcon = m.trust(XRedIcon);
        break;
    }

    return (
      (name || countryCode) &&
      m("#country-display-outer", [
        countryCode &&
          m("img.selected-country-flag", {
            src: `https://www.countryflags.io/${countryCode}/flat/64.png`,
            alt: `Flag of ${name}`,
          }),
        name && countryCode && m(".space"),
        name && m("label.selected-country-name", name),
        guessStatus && m(".guess-status", guessStatusIcon),
      ])
    );
  },
};
