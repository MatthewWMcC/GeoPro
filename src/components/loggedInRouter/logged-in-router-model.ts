import { bindTo } from "base/operators";
import m from "mithril";
import { distinctUntilChanged, pluck } from "rxjs/operators";
import { LoggedInChange, SetLogInPrevRoute } from "state/AuthState/actions";
import { store } from "state/store";
import { loggedInRouterAttrs, loggedInRouterState } from "./types";

export const model = {
  handleComponentInit: (
    vnode: m.VnodeDOM<loggedInRouterAttrs, loggedInRouterState>
  ) => {
    const { store$ } = vnode.attrs;
    vnode.state.subscriptions = [];

    vnode.state.subscriptions.push(
      store$
        .pipe(
          pluck("AuthState", "loggedIn"),
          distinctUntilChanged(),
          bindTo("loggedIn", vnode)
        )
        .subscribe()
    );

    vnode.state.subscriptions.push(
      store$
        .pipe(
          pluck("AuthState", "loadingUser"),
          distinctUntilChanged(),
          bindTo("loadingUser", vnode)
        )
        .subscribe()
    );
  },
  handleNotLoggedIn: () => {
    store.dispatch(SetLogInPrevRoute(m.route.get()));
    m.route.set("/login");
  },
};
