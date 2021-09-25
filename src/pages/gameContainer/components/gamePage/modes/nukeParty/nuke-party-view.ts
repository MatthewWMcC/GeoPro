import m from "mithril";
import { countryDisplay } from "../../components/countryDisplay.ts/country-display";
import { map } from "../../components/map/map";
import { model } from "./nuke-party-model";
import "./nuke-party.css";

import { NukePartyAttrs, NukePartyState } from "./types";

export const nukePartyView: m.Component<NukePartyAttrs, NukePartyState> = {
  oninit: model.handleComponentInit,
  onremove: model.handleComponentRemove,
  view: (vnode: m.VnodeDOM<NukePartyAttrs, NukePartyState>) => {
    const { store$ } = vnode.attrs;
    const { selected, myTurn, question } = vnode.state;
    const name = selected?.name;
    const countryCode = selected?.countryCode;

    return m("#nuke-party-container", [
      m(map, { store$ }),
      m("#nuke-party-overlay", [
        question &&
          m("#question-display-placement", [
            m("#question-container", [
              m("label.question-text", question.question),
            ]),
          ]),
        m("#country-display-placement", [
          m(countryDisplay, { name, countryCode }),
        ]),
        m("#submit-button-placement", [
          selected &&
            myTurn &&
            m(
              "button#submit-nuke-party-guess.styled-button",
              {
                onclick: () => model.handleSubmitButtonPress(vnode),
              },
              "Submit Guess"
            ),
        ]),
      ]),
    ]);
  },
};
