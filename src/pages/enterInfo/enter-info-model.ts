import m from "mithril";
import { EnterInfoAttrs, EnterInfoState } from "./types";
import { store } from "state/store";
import { FirstLogin, UpdateUsername } from "state/UserData/actions";
import { extendBaseModel } from "base/baseModel";
import { firestore } from "services/firestore";
import {
  GuestLoggedInChange,
  SetLogInPrevRoute,
} from "state/AuthState/actions";
import { UpdateCurrentPage } from "state/CurrentPageState/actions";
import { Pages } from "state/CurrentPageState/types";
import { distinctUntilChanged, map, pluck } from "rxjs/operators";
import { bindTo } from "base/operators";
import {
  getGuestStorageData,
  setNewGuestStorageData,
} from "services/local-storage";
import { getGuestData, getUserData } from "services/helpers";

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
  handleClickNextButton: (
    vnode: m.VnodeDOM<EnterInfoAttrs, EnterInfoState>
  ) => void;
  handlePressSignInAsGuest: (
    vnode: m.VnodeDOM<EnterInfoAttrs, EnterInfoState>
  ) => void;
  handlePressSignInAsUser: (
    vnode: m.VnodeDOM<EnterInfoAttrs, EnterInfoState>
  ) => void;
  handleLogOut: () => void;
}

export const model: EnterInfoModel = extendBaseModel({
  handleComponentInit: (vnode: m.VnodeDOM<EnterInfoAttrs, EnterInfoState>) => {
    const { store$ } = vnode.attrs;
    vnode.state.subscriptions = [];
    vnode.state.GuestSignIn = false;
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
  handlePressSignInAsGuest: (
    vnode: m.VnodeDOM<EnterInfoAttrs, EnterInfoState>
  ) => {
    // model.handleLogOut();
    vnode.state.GuestSignIn = true;
  },
  handlePressSignInAsUser: (
    vnode: m.VnodeDOM<EnterInfoAttrs, EnterInfoState>
  ) => {
    vnode.state.GuestSignIn = false;
  },
  handleClickNextButton: (
    vnode: m.VnodeDOM<EnterInfoAttrs, EnterInfoState>
  ) => {
    const username = store.getState().UserData.username;
    const { GuestSignIn } = vnode.state;
    if (!username) return;
    if (GuestSignIn) {
      model.handleLogOut();

      store.dispatch(GuestLoggedInChange(true));
      setNewGuestStorageData(username);

      const GuestData = getGuestStorageData();
      store.dispatch(FirstLogin(GuestData.userId, getGuestData(GuestData)));

      store.dispatch(GuestLoggedInChange(true));

      m.route.set(store.getState().AuthState.logInPrevRoute);
    } else {
      if (store.getState().AuthState.loggedIn) {
        m.route.set(store.getState().AuthState.logInPrevRoute);
        store.dispatch(SetLogInPrevRoute("/"));
        firestore._updateDocument({
          username,
        });
      }
    }
  },
  handleLogOut: () => {
    firestore._signOut();
  },
});
