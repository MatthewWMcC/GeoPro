import m from "mithril";
import { MapAttrs, MapState } from "./types";

const newObject = {
  handleComponentRemove: (vnode: m.VnodeDOM<MapAttrs, MapState>) => {
    vnode.state.subscriptions.forEach((subscription) =>
      subscription.unsubscribe()
    );
    vnode.state.subscriptions = [];

    vnode.state.map && vnode.state.map.remove();
  },
};

export const extendMapModel = (obj: Object): any => {
  return Object.assign(obj, newObject);
};
