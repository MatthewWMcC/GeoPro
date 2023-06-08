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
  },
  handleComponentCreate: (vnode: m.Vnode<NavigationAttrs, NavigationState>) => {
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
  handleComponentRemove(vnode) {
    vnode.state.mapOptionMaps.forEach((map) => {
      map.remove();
    });
    vnode.state.mapOptionMaps = [];

    vnode.state.subscriptions.forEach((subscription) =>
      subscription.unsubscribe()
    );
    vnode.state.subscriptions = [];
  },
  handleMapStyleChange: (preferedMapStyle: MapStyleTypes) => {
    store.dispatch(UpdateMapStyle(preferedMapStyle));
    firestore._updateDocument({
      preferedMapStyle,
    });
  },
};
