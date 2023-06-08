import "./loading-modal.css";
import m from "mithril";

export const loadingModal: m.Component<any, any> = {
  view: (vnode: m.VnodeDOM<any, any>) => {
    return m("#modal-background", [
      m("#loading-container", [m("#loading-wheel")]),
    ]);
  },
};
