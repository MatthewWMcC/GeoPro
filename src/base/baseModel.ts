import m from "mithril";
import { BaseAttrs, BaseState } from "./types";

const newObject = {
  handleComponentRemove: (vnode: m.VnodeDOM<BaseAttrs, BaseState>) => {
    vnode.state.subscriptions.forEach((subscription) =>
      subscription.unsubscribe()
    );
    vnode.state.subscriptions = [];
  },
};

export const extendBaseModel = (obj: Object): any => {
  return Object.assign(obj, newObject);
};
