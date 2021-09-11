import m from "mithril";
import { CountryDisplayAttrs, CountryDisplayState } from "./types";
import "./country-display.css";

export const countryDisplay: m.Component<
  CountryDisplayAttrs,
  CountryDisplayState
> = {
  view: (vnode: m.VnodeDOM<CountryDisplayAttrs, CountryDisplayState>) => {
    const { name, countryCode } = vnode.attrs;
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
      ])
    );
  },
};
