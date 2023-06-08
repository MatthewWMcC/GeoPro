import m from "mithril";

export const countdownOverlay: m.Component<{ countdown: number }> = {
  view: (vnode: m.VnodeDOM<{ countdown: number }>): m.Children => {
    const { countdown } = vnode.attrs;
    return m(".overlay", [
      m(".overlay-content-container", [m(".overlay-countdown", countdown)]),
    ]);
  },
};
