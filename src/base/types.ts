import { Observable, Subscription } from "rxjs";
import { rootState } from "state/types";

export interface BaseAttrs {
  store$: Observable<rootState>;
}

export interface BaseState {
  subscriptions: Array<Subscription>;
}

export interface MapAttrs {
  store$: Observable<rootState>;
}

export interface MapState {
  subscriptions: Array<Subscription>;
  map: mapboxgl.Map;
}
