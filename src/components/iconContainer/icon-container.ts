import m from "mithril";
import { IconContainerAttrs } from "./types";
import "./icon-container.css";

export const IconContainer: m.Component<IconContainerAttrs> = {
  view: (vnode: m.VnodeDOM<IconContainerAttrs>) => {
    const { src, size, color, borderWidth } = vnode.attrs;

    return m(
      ".icon-container-test",
      {
        style: `
        height: ${size}px;
        width: ${size}px;
        overflow:hidden;
        border-radius:${size / 2 + borderWidth}px;
        border:${color} ${borderWidth}px solid;
        display:flex;
        justify-content:center;
        align-items:center;
        background-color:white;
        `,
      },
      [
        m("img.icon-test", {
          src,
          style: `
                height: ${size}px;
        `,
        }),
      ]
    );
  },
};
