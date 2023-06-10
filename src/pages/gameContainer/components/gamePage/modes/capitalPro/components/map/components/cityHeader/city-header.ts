import m from "mithril";
import "./city-header.css";
import { CityHeaderAttrs, CityHeaderState } from "./types";
import { model } from "./city-header-model";

export const cityHeader: m.Component<CityHeaderAttrs, CityHeaderState> = {
  oninit: model.handleComponentInit,
  onremove: model.handleComponentRemove,
  oncreate: model.handleComponentCreate,
  view: (vnode: m.VnodeDOM<CityHeaderAttrs, CityHeaderState>): m.Children => {
    const { locationData, countdown, roundNumber, submitActive } = vnode.state;
    const locationList = [
      locationData.city,
      locationData.region,
      locationData.country,
    ];

    return m(".city-header-container", [
      !locationData.city &&
        m(".loading-holder", [
          m("label.loading-label.map-header-label", "Loading..."),
        ]),
      locationData.city &&
        m(".not-loading-holder", [
          locationList &&
            locationList.map((location) => {
              return m(".location-data-holder", [
                m("label.location-data-label.map-header-label", location),
              ]);
            }),
          m(".round-holder", [
            m("label.round-label.map-header-label", roundNumber),
          ]),
          m(".countdown-holder", [
            m("label.countdown-label.map-header-label", countdown),
          ]),
          m(
            `button.submit-button.styled-button${
              submitActive ? "" : ".disabled"
            }`,
            {
              onclick: () => model.handleSubmitClick(vnode),
              disabled: !submitActive,
            },
            "Submit"
          ),
        ]),
    ]);
  },
};
