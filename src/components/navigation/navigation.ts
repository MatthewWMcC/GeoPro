import m from "mithril";
import { NavigationAttrs, NavigationState } from "./types";
import "./navigation.css";
import { rightArrowSVG, leftArrowSVG } from "global/constants/icons";
import { model } from "./navigation-model";
import { Pages } from "state/CurrentPageState/types";
import { mapOptions } from "./constants";

export const navigation: m.Component<NavigationAttrs, NavigationState> = {
  onremove: model.handleComponentRemove,
  oninit: model.handleComponentInit,
  oncreate: model.handleComponentCreate,
  view: (vnode: m.VnodeDOM<NavigationAttrs, NavigationState>): m.Children => {
    const { navShown, CurrentPage } = vnode.state;

    return (
      CurrentPage !== Pages.LOGIN &&
      m(`.navigation-head-container${navShown ? "" : ".closed"}`, [
        m(".nav-main-container", [
          m("h4#map-style-label", "Map Style"),
          m("#map-options", [
            mapOptions.map(({ id, label, mapType }) => {
              return m(
                ".map-option",
                { onclick: () => model.handleMapStyleChange(mapType) },
                [
                  m(`.map-option-image-container#${id}`),
                  m("label#map-style-label", label),
                ]
              );
            }),
          ]),
        ]),
        m(".nav-show-hide-button-container", [
          m(
            "button.nav-show-hide-button",
            {
              onclick: () => {
                if (navShown) {
                  vnode.state.navShown = false;
                  m.redraw();
                } else {
                  vnode.state.navShown = true;
                  m.redraw();
                }
              },
            },
            [
              m(".nav-show-hide-message", [
                navShown ? m.trust(leftArrowSVG) : m.trust(rightArrowSVG),
              ]),
            ]
          ),
        ]),
      ])
    );
  },
};
