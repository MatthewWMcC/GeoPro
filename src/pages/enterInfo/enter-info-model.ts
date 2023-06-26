import m from "mithril";
import { EnterInfoAttrs, EnterInfoState } from "./types";
import { store } from "state/store";
import { UpdateUsername } from "state/UserData/actions";
import { extendBaseModel } from "base/baseModel";
import { firestore } from "services/firestore";
import { SetLogInPrevRoute } from "state/AuthState/actions";
import { UpdateCurrentPage } from "state/CurrentPageState/actions";
import { Pages } from "state/CurrentPageState/types";
import { distinctUntilChanged, map, pluck } from "rxjs/operators";
import { bindTo } from "base/operators";

interface EnterInfoModel {
  handleComponentInit: (
    vnode: m.VnodeDOM<EnterInfoAttrs, EnterInfoState>
  ) => void;
  handleComponentRemove: (
    vnode: m.VnodeDOM<EnterInfoAttrs, EnterInfoState>
  ) => void;
  handleUsernameChange: (
    vnode: m.VnodeDOM<EnterInfoAttrs, EnterInfoState>,
    event: any
  ) => void;
  handleLogIn: () => void;
  handleClickNextButton: () => void;
  handlePressSignInAsGuest: () => void;
  handleSignOut: () => void;
}

export const model: EnterInfoModel = extendBaseModel({
  handleComponentInit: (vnode: m.VnodeDOM<EnterInfoAttrs, EnterInfoState>) => {
    const { store$ } = vnode.attrs;
    vnode.state.subscriptions = [];
    store.dispatch(UpdateCurrentPage(Pages.LOGIN));

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
          pluck("AuthState", "loggedIn"),
          distinctUntilChanged(),
          bindTo("loggedIn", vnode)
        )
        .subscribe()
    );
  },
  handleUsernameChange: (
    vnode: m.VnodeDOM<EnterInfoAttrs, EnterInfoState>,
    event: any
  ) => {
    const username = event.target.value;
    store.dispatch(UpdateUsername(username));
  },
  handleLogIn: () => {
    firestore._runAuth();
  },
  handlePressSignInAsGuest: () => {
    console.log("Guest");
  },
  handleClickNextButton: () => {
    const username = store.getState().UserData.username;
    if (store.getState().AuthState.loggedIn && username) {
      m.route.set(store.getState().AuthState.logInPrevRoute);
      store.dispatch(SetLogInPrevRoute("/"));
      firestore._updateDocument({
        username,
      });
    }
  },
  handleSignOut: () => {},
});
