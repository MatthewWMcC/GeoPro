import m from "mithril";
import { HeaderAttrs, HeaderState } from "./types";
import { pluck, distinctUntilChanged, map } from "rxjs/operators";
import { extendBaseModel } from "base/baseModel";
import { bindTo } from "base/operators";
import { firestore } from "services/firestore";
import { store } from "state/store";
import { guestLogOut } from "services/local-storage";

interface HeaderModel {
  handleComponentRemove: (vnode: m.VnodeDOM<HeaderAttrs, HeaderState>) => void;
  handleComponentInit: (vnode: m.VnodeDOM<HeaderAttrs, HeaderState>) => void;
  handleLogoClick: (vnode: m.VnodeDOM<HeaderAttrs, HeaderState>) => void;
  handleLogOutClick: () => void;
}

export const model: HeaderModel = {
  handleComponentRemove: (vnode: m.VnodeDOM<HeaderAttrs, HeaderState>) => {
    vnode.state.subscriptions.forEach((subscription) =>
      subscription.unsubscribe()
    );
    vnode.state.subscriptions = [];
  },
  handleComponentInit: (vnode: m.VnodeDOM<HeaderAttrs, HeaderState>) => {
    const { store$ } = vnode.attrs;
    vnode.state.subscriptions = [];
    vnode.state.displaySettings = false;

    vnode.state.subscriptions.push(
      store$
        .pipe(
          pluck("UserData"),
          distinctUntilChanged(),
          map(({ username, userIconSrc }) => {
            return {
              username,
              userIconSrc,
            };
          }),
          bindTo("UserData", vnode)
        )
        .subscribe()
    );

    vnode.state.subscriptions.push(
      store$
        .pipe(
          pluck("CurrentPageData", "CurrentPage"),
          distinctUntilChanged(),
          bindTo("CurrentPage", vnode)
        )
        .subscribe()
    );

    const body = document.getElementById("body-content-container");

    body &&
      body.addEventListener("click", () => {
        if (vnode.state.displaySettings) {
          vnode.state.displaySettings = false;
          m.redraw();
        }
      });
  },
  handleLogoClick: (vnode: m.VnodeDOM<HeaderAttrs, HeaderState>) => {
    m.route.set("/");
  },
  handleLogOutClick: () => {
    const { loggedIn, guestLoggedIn } = store.getState().AuthState;
    if (loggedIn) {
      firestore._signOut();
    } else if (guestLoggedIn) {
      guestLogOut();
    }
  },
};
