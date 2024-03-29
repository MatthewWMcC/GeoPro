import { model } from "./round-end-modal-model";
import m from "mithril";
import "./round-end-modal.css";

import { RoundEndModalAttrs, RoundEndModalState } from "./types";

export const RoundEndModal: m.Component<
  RoundEndModalAttrs,
  RoundEndModalState
> = {
  oninit: model.handleComponentInit,
  oncreate: model.handleComponentCreate,
  onremove: model.handleComponentRemove,
  view: (vnode: m.VnodeDOM<RoundEndModalAttrs, RoundEndModalState>) => {
    const { locationData, yourData, roundEndCountdown, wikiData } = vnode.state;
    const { playerDistancekm, addedScore } = yourData;

    const {
      link = "",
      title = "",
      summary = "",
      photourl = "",
    } = { ...wikiData };

    return m(".round-end-modal-outer-container", [
      m(".round-end-modal-container", [
        m(".round-end-header", [
          locationData.city &&
            m(
              "h2.round-end-header-label",
              `All the guesses are in for ${
                locationData.city + ", " + locationData.country
              }`
            ),
          m("h3.countdown", roundEndCountdown),
        ]),
        m("#round-end-body-container", [
          m("#map-half", [
            m("#your-distance-container", [
              m(
                "label#your-distance-label",
                playerDistancekm
                  ? `Your guess was ${playerDistancekm}km away and you gained ${addedScore} points!`
                  : "You did not make a guess :("
              ),
            ]),
            m("#map-container-round-end"),
          ]),
          m("#info-holder", [
            m("#wiki-data-holder", [
              m("#wiki-title-link-holder", [
                m("label#wiki-label", title),
                m("label#dash", "-"),
                m("#wiki-link", [
                  m(
                    "a",
                    {
                      href: link,
                      target: "_blank",
                      rel: "noopener noreferrer",
                    },
                    "wikipedia"
                  ),
                ]),
              ]),
              m("#inner-wiki-data-holder", [
                m("#wiki-summary-holder", summary),
                m("#wiki-image-holder", [m("img", { src: photourl })]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]);
  },
};
