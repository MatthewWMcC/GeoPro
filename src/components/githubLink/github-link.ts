import m from "mithril";
import "./github-link.css";
import { githubIcon } from "global/constants/icons";

export const githubLink: m.Component = {
  view: () => {
    return m(
      "a.github-link-outer",
      { href: "https://github.com/MatthewWMcC/GeoPro" },
      m.trust(githubIcon)
    );
  },
};
