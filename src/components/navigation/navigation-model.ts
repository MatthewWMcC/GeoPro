import { extendBaseModel } from "base/baseModel";
import { bindTo } from "base/operators";
import m from "mithril";
import { distinctUntilChanged, pluck } from "rxjs/operators";
import { firestore } from "services/firestore";
import { store } from "state/store";
import { UpdateMapStyle } from "state/UserData/actions";
import { MapStyleTypes } from "state/UserData/types";
import { NavigationAttrs, NavigationState } from "./types";

interface NavigationModel {
  handleComponentInit: (
    vnode: m.VnodeDOM<NavigationAttrs, NavigationState>
  ) => void;
  handleComponentRemove: (
    vnode: m.VnodeDOM<NavigationAttrs, NavigationState>
  ) => void;
  handleMapStyleChange: (mapStyleChange: MapStyleTypes) => void;
}

export const model: NavigationModel = extendBaseModel({
  handleComponentInit: (
    vnode: m.VnodeDOM<NavigationAttrs, NavigationState>
  ) => {
    const { store$ } = vnode.attrs;
    vnode.state.navShown = false;
    vnode.state.subscriptions = [];

    vnode.state.subscriptions.push(
      store$
        .pipe(
          pluck("CurrentPageData", "CurrentPage"),
          distinctUntilChanged(),
          bindTo("CurrentPage", vnode)
        )
        .subscribe()
    );
  },
  handleMapStyleChange: (preferedMapStyle: MapStyleTypes) => {
    store.dispatch(UpdateMapStyle(preferedMapStyle));
    firestore._updateDocument({
      preferedMapStyle,
    });
  },
});
