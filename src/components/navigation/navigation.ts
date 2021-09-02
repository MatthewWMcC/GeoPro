import m from "mithril";
import { NavigationAttrs, NavigationState } from "./types";
import "./navigation.css";
import { rightArrowSVG, leftArrowSVG } from "global/constants/icons";
import { model } from "./navigation-model";
import { MapStyleTypes } from "state/UserData/types";
import { Pages } from "state/CurrentPageState/types";

export const navigation: m.Component<NavigationAttrs, NavigationState> = {
  onremove: model.handleComponentRemove,
  oninit: model.handleComponentInit,
  view: (vnode: m.VnodeDOM<NavigationAttrs, NavigationState>): m.Children => {
    const { navShown, CurrentPage } = vnode.state;

    return (
      CurrentPage !== Pages.LOGIN &&
      m(".navigation-head-container", [
        navShown &&
          m(".nav-main-container", [
            m(".map-holder", [
              m(
                "button.dark-map-button",
                {
                  onclick: () => model.handleMapStyleChange(MapStyleTypes.DARK),
                },
                "Dark"
              ),
              m(
                "button.light-map-button",
                {
                  onclick: () =>
                    model.handleMapStyleChange(MapStyleTypes.LIGHT),
                },
                "Light"
              ),
              m(
                "button.light-map-button",
                {
                  onclick: () =>
                    model.handleMapStyleChange(MapStyleTypes.STREET),
                },
                "Street"
              ),
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
