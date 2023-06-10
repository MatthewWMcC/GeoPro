import m from "mithril";
import { EnterInfoAttrs, EnterInfoState } from "./types";
import { model } from "./enter-info-model";
import "./enter-info.css";
import { IconContainer } from "components/iconContainer/icon-container";
import { checkmarkSVG } from "global/constants/icons";

export const enterInfo: m.Component<EnterInfoAttrs, EnterInfoState> = {
  oninit: model.handleComponentInit,
  onremove: model.handleComponentRemove,
  view: (vnode: m.VnodeDOM<EnterInfoAttrs, EnterInfoState>): m.Children => {
    const { loggedIn, UserData } = vnode.state;
    const { userIconSrc, username } = UserData;
    return m("#sign-in-page", [
      m(".logo-title-holder", [
        m("img#logo-and-title", {
          src: "https://storage.googleapis.com/geopro-324602.appspot.com/geopro-logo-title-image.png",
          alt: "logo and title",
        }),
      ]),

      m("#enter-info-section", [
        m("label.login-header", "Google Sign In"),
        m("#google-login-section", [
          m(IconContainer, {
            src: loggedIn
              ? userIconSrc
              : "https://media-exp1.licdn.com/dms/image/C4D0BAQHiNSL4Or29cg/company-logo_200_200/0/1519856215226?e=2159024400&v=beta&t=r--a5-Dl4gvVE-xIkq8QyBzZ8mQ-OYwBOrixNzR95H0",
            size: 50,
            color: "#a6a6a6",
            borderWidth: 2,
          }),
          loggedIn
            ? m(".logged-in-message-container", [
                m(".signed-in-message", "Signed In Successfully"),
                m(".check-icon", m.trust(checkmarkSVG)),
              ])
            : m(
                "button.styled-button.login-button",
                {
                  onclick: () => {
                    model.handleLogIn();
                  },
                },
                "Sign In"
              ),
        ]),
        m("#display-name-container", [
          m("input.styled-text-input#display-name-input", {
            type: "text",
            placeholder: "Enter display name...",
            maxlength: "15",
            value: username,
            oninput: (event: any) => model.handleUsernameChange(vnode, event),
          }),
        ]),
        m(
          "button.go-to-game.styled-button",
          {
            onclick: () => model.handleClickNextButton(),
          },
          "Next"
        ),
      ]),
    ]);
  },
};
