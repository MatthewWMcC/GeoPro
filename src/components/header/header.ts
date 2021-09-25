import m from "mithril";
import { model } from "./header-model";
import { HeaderAttrs, HeaderState } from "./types";
import "./header.css";
import { Pages } from "state/CurrentPageState/types";
import {
  backButtonSVG,
  doorLogOutSVG,
  downArrowSVG,
  upArrowSVG,
} from "global/constants/icons";
import { IconContainer } from "components/iconContainer/icon-container";

export const header: m.Component<HeaderAttrs, HeaderState> = {
  oninit: model.handleComponentInit,
  onremove: model.handleComponentRemove,
  view: (vnode: m.VnodeDOM<HeaderAttrs, HeaderState>): m.Children => {
    const DropdownSettings = [
      {
        text: "Log out",
        function: model.handleLogOutClick,
      },
    ];
    const { UserData, CurrentPage, displaySettings } = vnode.state;
    const { username, userIconSrc } = UserData;
    return m(
      `div.header${CurrentPage === Pages.LOGIN ? ".display-none" : ""}`,
      [
        m(".left-side", [
          m(".back-button-container", [
            m(
              "button#back-button.styled-button",
              {
                onclick: () => history.back(),
              },
              [m.trust(backButtonSVG)]
            ),
          ]),
          m(
            ".header-label-container",
            {
              onclick: () => model.handleLogoClick(vnode),
            },
            [
              m("img#logo-and-title-header", {
                src: "https://storage.googleapis.com/geopro-324602.appspot.com/geopro-logo-title-image.png",
                alt: "logo and title",
              }),
            ]
          ),
        ]),
        m(".right-side", [
          m(IconContainer, {
            size: 40,
            src: userIconSrc,
            color: "gold",
            borderWidth: 4,
          }),
          m(".dropdown-container", [
            m(
              ".dropdown-title-container",
              {
                onclick: () =>
                  (vnode.state.displaySettings = !vnode.state.displaySettings),
              },
              [
                m(".header-username-container", [
                  m("label.username", username),
                ]),
                m.trust(displaySettings ? upArrowSVG : downArrowSVG),
              ]
            ),
            displaySettings &&
              m(".dropdown-content-container", [
                DropdownSettings.map((setting) => {
                  return m(
                    ".dropdown-option",
                    {
                      onclick: setting.function,
                    },
                    [
                      m(
                        ".dropdown-option-text-container",

                        [
                          m.trust(doorLogOutSVG),
                          m(".dropdown-option-text", setting.text),
                        ]
                      ),
                    ]
                  );
                }),
              ]),
          ]),
        ]),
      ]
    );
  },
};
