import m from "mithril";
import { NukeImageAttrs } from "./types";
import "./nuke-image.css";

export const nukeImageView: m.Component<NukeImageAttrs> = {
  view: (vnode: m.VnodeDOM<NukeImageAttrs>) => {
    const { color } = vnode.attrs;
    if (color === "blue") {
      return m("#nuke-image-container#explosion", [
        m("img#nuke-image", {
          src: "https://i.pinimg.com/originals/a4/54/05/a454052e62b00974cfffcc4848ff9e3b.png",
        }),
      ]);
    } else {
      return m("#nuke-image-container", [
        m("#nuke-background", {
          style: `background-color: ${color}`,
        }),
        m("img#nuke-image", {
          src: "https://storage.googleapis.com/geopro-324602.appspot.com/images/nuke-image.png",
        }),
      ]);
    }
  },
};
