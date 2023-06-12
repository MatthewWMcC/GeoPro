import { extendMapModel } from "base/mapModel";
import { bindTo } from "base/operators";
import mapboxgl from "mapbox-gl";
import m from "mithril";
import { distinctUntilChanged, map, pluck, tap } from "rxjs/operators";
import { gameTypeId } from "state/GameData/types";
import { store } from "state/store";
import { MapStyles } from "state/UserData/types";
import { getMapboxAPIToken } from "utils/environment-vars-helper";
import { IMapAttrs, IMapState } from "./types";
import { socket } from "socket/socket-main";

export const model = extendMapModel({
  handleComponentInit: (vnode: m.VnodeDOM<IMapAttrs, IMapState>) => {
    const { store$ } = vnode.attrs;
    vnode.state.subscriptions = [];
    vnode.state.subscriptions.push(
      store$
        .pipe(
          pluck("GameData", "modeData", "turnUserId"),
          distinctUntilChanged(),
          map((turnUserId) => turnUserId === store.getState().UserData.userId),
          bindTo("myTurn", vnode)
        )
        .subscribe()
    );
  },
  initializeMap: (vnode: m.VnodeDOM<IMapAttrs, IMapState>) => {
    const mapbox = new mapboxgl.Map({
      accessToken: getMapboxAPIToken(),
      container: document.getElementById("map-view") as HTMLElement,
      style: MapStyles[store.getState().UserData.preferedMapStyle].withBorders,
    });
    mapbox.on("style.load", function () {
      mapbox.on("click", (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
        const { gameMode } = store.getState().GameData;
        const { myTurn } = vnode.state;
        if (gameMode === gameTypeId.NUKE_PARTY && myTurn) {
          model.handleNukePartyClick(e);
        }
      });
    });
    vnode.state.map = mapbox;
  },
  handleComponentCreate: (vnode: m.VnodeDOM<IMapAttrs, IMapState>) => {
    const { store$ } = vnode.attrs;

    vnode.state.subscriptions.push(
      store$
        .pipe(
          pluck("UserData", "preferedMapStyle"),
          distinctUntilChanged(),
          tap(() => {
            vnode.state?.map?.remove();
            model.initializeMap(vnode);
          })
        )
        .subscribe()
    );
  },
  handleNukePartyClick: (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
    const { lng } = e.lngLat;
    const { lat } = e.lngLat;
    if (!store.getState().GameData.modeData?.canGuess) {
      return;
    }
    m.request({
      method: "GET",
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=country&access_token=${getMapboxAPIToken()}`,
    })
      .then((result: any) => {
        const country = result.features[0];

        return {
          name: country.place_name,
          countryCode: country.properties.short_code.toUpperCase(),
        };
      })
      .then((country) => {
        socket.emit("select-country", country);
      })
      .catch(() => {
        console.log("not a country");
      });
  },
});
