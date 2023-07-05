import { model } from "./logged-in-router-model";
import m from "mithril";
import { loggedInRouterAttrs, loggedInRouterState } from "./types";
import { loadingModal } from "components/loadingModal/loading-modal";

export const loggedInRouter: m.Component<
  loggedInRouterAttrs,
  loggedInRouterState
> = {
  oninit: model.handleComponentInit,
  view: (vnode: m.VnodeDOM<loggedInRouterAttrs, loggedInRouterState>) => {
    const { loggedIn, loadingUser, guestLoggedIn } = vnode.state;
    const { childComponent } = vnode.attrs;
    if (loadingUser) {
      return m(loadingModal);
    } else {
      if (!loggedIn && !guestLoggedIn) {
        model.handleNotLoggedIn();
        return m(loadingModal);
      }
      return childComponent;
    }
  },
};
