import { bindTo } from "base/operators";
import mapboxgl from "mapbox-gl";
import m from "mithril";
import { distinctUntilChanged, pluck } from "rxjs/operators";
import { firestore } from "services/firestore";
import { store } from "state/store";
import { UpdateMapStyle } from "state/UserData/actions";
import { MapStyles, MapStyleTypes } from "state/UserData/types";
import { getMapboxAPIToken } from "utils/environment-vars-helper";
import { mapOptions } from "./constants";
import { NavigationAttrs, NavigationState } from "./types";
import { setDefaultMapboxStyle } from "services/local-storage";
import { runFunctionWhenOtherElementsClicked } from "utils/element-helper";

interface NavigationModel {
  handleComponentInit: (
    vnode: m.Vnode<NavigationAttrs, NavigationState>
  ) => void;
  handleComponentRemove: (
    vnode: m.VnodeDOM<NavigationAttrs, NavigationState>
  ) => void;
  handleComponentCreate: (
    vnode: m.VnodeDOM<NavigationAttrs, NavigationState>
  ) => void;
  handleMapStyleChange: (mapStyleChange: MapStyleTypes) => void;
  closeNav: (vnode: m.VnodeDOM<NavigationAttrs, NavigationState>) => void;
}

export const model: NavigationModel = {
  handleComponentInit: (vnode: m.Vnode<NavigationAttrs, NavigationState>) => {
    const { store$ } = vnode.attrs;
    vnode.state.navShown = false;
    vnode.state.subscriptions = [];
    vnode.state.mapOptionMaps = [];

    vnode.state.subscriptions.push(
      store$
        .pipe(
          pluck("CurrentPageData", "CurrentPage"),
          distinctUntilChanged(),
          bindTo("CurrentPage", vnode)
        )
        .subscribe()
    );

    vnode.state.subscriptions.push(
      store$
        .pipe(
          pluck("UserData", "preferedMapStyle"),
          distinctUntilChanged(),
          bindTo("preferedMapStyle", vnode)
        )
        .subscribe()
    );
  },
  handleComponentCreate: (
    vnode: m.VnodeDOM<NavigationAttrs, NavigationState>
  ) => {
    vnode.state.removeEventListener = runFunctionWhenOtherElementsClicked(
      "navigation-content-container",
      () => model.closeNav(vnode)
    );

    mapOptions.forEach(({ id, mapType }) => {
      vnode.state.mapOptionMaps.push(
        new mapboxgl.Map({
          accessToken: getMapboxAPIToken(),
          container: document.getElementById(id) as HTMLElement,
          style: MapStyles[mapType].withBorders,
          center: [0, 45],
          zoom: 1,
          interactive: false,
          attributionControl: false,
        })
      );
    });
  },
  handleComponentRemove(vnode: m.VnodeDOM<NavigationAttrs, NavigationState>) {
    console.log("remove");
    vnode.state.mapOptionMaps.forEach((map) => {
      map.remove();
    });
    vnode.state.mapOptionMaps = [];

    vnode.state.subscriptions.forEach((subscription) =>
      subscription.unsubscribe()
    );
    vnode.state.subscriptions = [];

    vnode.state.removeEventListener();
  },
  handleMapStyleChange: (preferedMapStyle: MapStyleTypes) => {
    const { loggedIn, guestLoggedIn } = store.getState().AuthState;
    store.dispatch(UpdateMapStyle(preferedMapStyle));

    if (loggedIn) {
      firestore._updateDocument({
        preferedMapStyle,
      });
    } else if (guestLoggedIn) {
      setDefaultMapboxStyle(preferedMapStyle);
    }
  },
  closeNav: (vnode: m.VnodeDOM<NavigationAttrs, NavigationState>) => {
    if (vnode.state.navShown) {
      vnode.state.navShown = false;
      m.redraw();
    }
  },
};
