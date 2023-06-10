import { bindTo } from "base/operators";
import mapboxgl from "mapbox-gl";
import m from "mithril";
import {
  distinctUntilChanged,
  filter,
  map,
  pluck,
  take,
  tap,
} from "rxjs/operators";
import { CapitalProPlayer } from "state/GameData/modes/CapitalProData/types";
import { player } from "state/GameData/types";
import { store } from "state/store";
import { MapStyles } from "state/UserData/types";
import { getMapboxAPIToken } from "utils/environment-vars-helper";
import { extendMapModel } from "base/mapModel";
import wiki from "wikijs";

import { RoundEndModalAttrs, RoundEndModalState } from "./types";

interface RoundEndModalType {
  handleComponentRemove: (
    vnode: m.VnodeDOM<RoundEndModalAttrs, RoundEndModalState>
  ) => void;
  handleComponentInit: (
    vnode: m.VnodeDOM<RoundEndModalAttrs, RoundEndModalState>
  ) => void;
  handleComponentCreate: (
    vnode: m.VnodeDOM<RoundEndModalAttrs, RoundEndModalState>
  ) => void;
  initializeMap: (
    vnode: m.VnodeDOM<RoundEndModalAttrs, RoundEndModalState>,
    view: mapboxgl.LngLat
  ) => mapboxgl.Map;
  addMapLocationMarker: (
    vnode: m.VnodeDOM<RoundEndModalAttrs, RoundEndModalState>,
    map: mapboxgl.Map
  ) => void;
  addPlayerMarkers: (
    vnode: m.VnodeDOM<RoundEndModalAttrs, RoundEndModalState>,
    mapbox: mapboxgl.Map
  ) => void;
  scrollOutMap: (
    vnode: m.VnodeDOM<RoundEndModalAttrs, RoundEndModalState>,
    mapbox: mapboxgl.Map
  ) => void;
  getFurthestDistance: (playerData: player[]) => number;
}

export const model: RoundEndModalType = extendMapModel({
  initializeMap: (
    vnode: m.VnodeDOM<RoundEndModalAttrs, RoundEndModalState>,
    view: mapboxgl.LngLat
  ): mapboxgl.Map => {
    const map = new mapboxgl.Map({
      accessToken: getMapboxAPIToken(),
      container: document.getElementById(
        "map-container-round-end"
      ) as HTMLElement,
      style: MapStyles[vnode.state.mapStyle].labels,
      center: [view.lng, view.lat],
      zoom: 12,
      interactive: false,
    });

    map.on("load", () => {
      model.addMapLocationMarker(vnode, map);
      model.addPlayerMarkers(vnode, map);
      model.scrollOutMap(vnode, map);
    });

    return map;
  },
  addMapLocationMarker: (
    vnode: m.VnodeDOM<RoundEndModalAttrs, RoundEndModalState>,
    map: mapboxgl.Map
  ) => {
    const { store$ } = vnode.attrs;
    const locationData$ = store$.pipe(
      pluck("GameData", "modeData", "locationData"),
      filter((val) => !!val),
      distinctUntilChanged()
    );

    vnode.state.subscriptions.push(
      locationData$
        .pipe(
          tap((locationData) => {
            locationData.lnglat &&
              (vnode.state.locationMarker = new mapboxgl.Marker({
                color: "#ff0000",
              })
                .setLngLat(locationData.lnglat)
                .addTo(map));
          })
        )
        .subscribe()
    );
  },
  addPlayerMarkers: (
    vnode: m.VnodeDOM<RoundEndModalAttrs, RoundEndModalState>,
    mapbox: mapboxgl.Map
  ) => {
    const { store$ } = vnode.attrs;
    const playerData$ = store$.pipe(
      pluck("GameData", "modeData", "playerList"),
      distinctUntilChanged()
    );

    vnode.state.subscriptions.push(
      playerData$
        .pipe(
          tap((playerList) =>
            playerList.forEach((player) => {
              var popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false,
                closeOnMove: false,
                anchor: "bottom",
              })
                .setText(
                  `${player.username}, ${Math.ceil(player.distance / 1000)}km`
                )
                .addTo(mapbox);
              !!player.guess &&
                vnode.state.playerLocationMarkers.push(
                  new mapboxgl.Marker()
                    .setLngLat(player.guess)
                    .addTo(mapbox)
                    .setPopup(popup)
                );
            })
          )
        )
        .subscribe()
    );
  },
  scrollOutMap: (
    vnode: m.VnodeDOM<RoundEndModalAttrs, RoundEndModalState>,
    mapbox: mapboxgl.Map
  ) => {
    const { store$ } = vnode.attrs;
    const playerData$ = store$.pipe(
      pluck("GameData", "modeData", "playerList"),
      distinctUntilChanged()
    );

    vnode.state.subscriptions.push(
      playerData$
        .pipe(
          map((playerData) => model.getFurthestDistance(playerData)),
          map((distance) => Math.ceil(distance / 1000)),
          map((distance) => 12 * Math.exp((-1 / 8) * distance ** 0.32)),
          tap((zoom) => {
            setTimeout(() => {
              if (zoom < mapbox.getZoom()) {
                mapbox.flyTo({
                  essential: true,
                  duration: 8000 * Math.exp(-0.125 * zoom),
                  zoom: zoom < mapbox.getZoom() ? zoom : mapbox.getZoom(),
                });
                mapbox.on("idle", () => {
                  mapbox["scrollZoom"].enable();
                  mapbox["boxZoom"].enable();
                  mapbox["dragPan"].enable();
                  mapbox["keyboard"].enable();
                  mapbox["doubleClickZoom"].enable();
                });
              } else {
                mapbox["scrollZoom"].enable();
                mapbox["boxZoom"].enable();
                mapbox["dragPan"].enable();
                mapbox["keyboard"].enable();
                mapbox["doubleClickZoom"].enable();
              }
            }, 1000);
          }),
          take(1)
        )
        .subscribe()
    );
  },
  getFurthestDistance: (playerData: CapitalProPlayer[]): number => {
    return playerData.reduce<number>((prev, curr) => {
      if (!curr.distance) return prev;
      return prev > curr.distance ? prev : curr.distance;
    }, 0);
  },
  handleComponentInit: (
    vnode: m.VnodeDOM<RoundEndModalAttrs, RoundEndModalState>
  ) => {
    const { store$ } = vnode.attrs;
    vnode.state.subscriptions = [];
    vnode.state.playerLocationMarkers = [];

    const locationData$ = store$.pipe(
      pluck("GameData", "modeData", "locationData"),
      distinctUntilChanged()
    );

    const playerData$ = store$.pipe(
      pluck("GameData", "modeData", "playerList"),
      distinctUntilChanged()
    );

    vnode.state.subscriptions.push(
      locationData$
        .pipe(
          filter((locationData) => !!locationData.lnglat),
          tap((locationData) => {
            m.request({
              method: "GET",
              url: `https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&origin=*&ids=${locationData.wikiId}`,
            })
              .then(
                (result: any) =>
                  locationData.wikiId &&
                  result.entities[locationData.wikiId].sitelinks.enwiki.title
              )
              .then((title) => setDataWithTitle(title));
          }),
          take(1)
        )
        .subscribe()
    );

    vnode.state.subscriptions.push(
      store$
        .pipe(
          pluck("GameData", "modeData", "locationData"),
          distinctUntilChanged(),
          bindTo("locationData", vnode)
        )
        .subscribe()
    );
    vnode.state.subscriptions.push(
      store$
        .pipe(
          pluck("GameData", "modeData", "roundEndCountdown"),
          distinctUntilChanged(),
          bindTo("roundEndCountdown", vnode)
        )
        .subscribe()
    );

    vnode.state.subscriptions.push(
      store$
        .pipe(
          pluck("UserData", "preferedMapStyle"),
          distinctUntilChanged(),
          bindTo("mapStyle", vnode)
        )
        .subscribe()
    );

    vnode.state.subscriptions.push(
      playerData$
        .pipe(
          map(
            (playerData) =>
              playerData.filter(
                (player) => player.userId === store.getState().UserData.userId
              )[0]
          ),
          map((player) => {
            return {
              playerDistancekm: player.distance / 1000,
              addedScore: player.addedScore,
            };
          }),
          bindTo("yourData", vnode)
        )
        .subscribe()
    );
  },
  handleComponentCreate: (
    vnode: m.VnodeDOM<RoundEndModalAttrs, RoundEndModalState>
  ) => {
    const { store$ } = vnode.attrs;

    const locationData$ = store$.pipe(
      pluck("GameData", "modeData", "locationData"),
      distinctUntilChanged()
    );

    vnode.state.subscriptions.push(
      locationData$
        .pipe(
          filter((locationData) => !!locationData.lnglat),
          map((locationData) =>
            model.initializeMap(vnode, locationData.lnglat!)
          ),
          take(1),
          bindTo("map", vnode)
        )
        .subscribe()
    );
  },
});

const setDataWithTitle = (title: string) => {
  document.getElementById("wiki-label")?.innerText = title;
  wiki()
    .page(title)
    .then((page) => page.url())
    .then((url) => {
      document.getElementById(
        "wiki-link"
      )?.innerHTML = `<a href="${url}" target="_blank" rel="noopener noreferrer">wikipedia</a>`;
    });
  wiki()
    .page(title)
    .then((page) => page.summary())
    .then((summary) => {
      const val = reduceText(summary, 800);
      document.getElementById("wiki-summary-holder")?.innerText = val;
    });

  wiki()
    .page(title)
    .then((page) => page.fullInfo())
    .then((content: any) => {
      switch (content.general.imageSkyline) {
        case "Photomontage":
          return content.general.photo1a.split("!")[0];
        case "multiple image":
          return content.general.image1;
        default:
          return content.general.imageSkyline;
      }
    })
    .then((mainURI) => standardizeURI(mainURI))
    .then((standardizedURI) => {
      wiki()
        .page(title)
        .then((page) => page.rawImages())
        .then((rawImages) => {
          const image = rawImages.filter((rawImage) => {
            const standardizedRawImage = standardizeURI(rawImage.title);
            return standardizedRawImage === "File:" + standardizedURI;
          })[0];
          return image || rawImages.find((image) => "pageid" in image);
        })
        .then((image: any) => image.imageinfo[0].url)
        .then((url) => {
          document.getElementById(
            "wiki-image-holder"
          )?.innerHTML = `<img src="${url}"/>`;
        });
    });
};

const standardizeURI = (uri: string): string => {
  return uri?.replace(" ", "_");
};

const reduceText = (text: string, size: number): string => {
  return text.substring(0, text.indexOf(".", size) + 1) || text;
};
