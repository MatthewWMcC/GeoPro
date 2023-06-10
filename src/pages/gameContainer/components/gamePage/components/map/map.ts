import { model } from "./map-model";
import m from "mithril";
import { IMapAttrs, IMapState } from "./types";
import "./map.css";

export const map: m.Component<IMapAttrs, IMapState> = {
  oninit: model.handleComponentInit,
  onremove: model.handleComponentRemove,
  oncreate: model.handleComponentCreate,
  view: (vnode: m.VnodeDOM<IMapAttrs, IMapState>) => {
    return m("#map-view");
  },
};
