import m from "mithril";
import { initSocketDataSetup } from "socket/socket-helpers";
import { MainPageAttrs, MainPageState } from "./types";
import { socket } from "socket/socket-main";
import { Pages } from "state/CurrentPageState/types";
import { UpdateCurrentPage } from "state/CurrentPageState/actions";
import { store } from "state/store";
import { BASE_PROD_URL } from "utils/constants";

interface MainPageModel {
  handleComponentInit: (
    vnode: m.VnodeDOM<MainPageAttrs, MainPageState>
  ) => void;
  handleComponentCreate: (
    vnode: m.VnodeDOM<MainPageAttrs, MainPageState>
  ) => void;
  handleMakeNewGamePress: (
    vnode: m.VnodeDOM<MainPageAttrs, MainPageState>,
    gameMode: string
  ) => void;
  handleGoToRoom: (vnode: m.VnodeDOM<MainPageAttrs, MainPageState>) => void;
}

export const model: MainPageModel = {
  handleComponentInit: (vnode: m.VnodeDOM<MainPageAttrs, MainPageState>) => {
    const { store$ } = vnode.attrs;
    store.dispatch(UpdateCurrentPage(Pages.MAIN));

    initSocketDataSetup(store$);
  },
  handleComponentCreate: (vnode: m.VnodeDOM<MainPageAttrs, MainPageState>) => {
    const textbox = document.getElementById("enter-game-uri");
    if (textbox) textbox.focus();
  },
  handleMakeNewGamePress: (
    vnode: m.VnodeDOM<MainPageAttrs, MainPageState>,
    gameMode: string
  ) => {
    socket.emit("start-new-lobby", gameMode);
  },
  handleGoToRoom: (vnode: m.VnodeDOM<MainPageAttrs, MainPageState>) => {
    let { roomURL } = vnode.state;
    if (!roomURL.includes(BASE_PROD_URL + "room/")) {
      console.log("invalid room code");
    } else {
      roomURL = roomURL.replace(BASE_PROD_URL, "/");
      m.route.set(roomURL);
    }
  },
};
