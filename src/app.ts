import m from "mithril";
import "./styles.css";
import { header } from "components/header/header";
import { enterInfo } from "pages/enterInfo/enter-info";
import { store } from "state/store";
import { rootState } from "state/types";
import { Observable } from "rxjs";
import { InitUserData } from "state/UserData/actions";
import { navigation } from "components/navigation/navigation";
import { mainPage } from "pages/mainPage/main-page";
import { gameContainer } from "pages/gameContainer/game-container";
import { loggedInRouter } from "components/loggedInRouter/logged-in-router";

const initApp = async () => {
  await initDispatch();
  createApp();
};

const initDispatch = async () => {
  store.dispatch(InitUserData(undefined));
  return;
};

const createApp = () => {
  const bodyContentContainer = document.getElementById(
    "body-content-container"
  );
  const navigationContentContainer = document.getElementById(
    "navigation-content-container"
  );
  const headerContentContainer = document.getElementById(
    "header-content-container"
  );

  if (headerContentContainer === null) {
    throw new Error("The header-content-container was not found");
  }

  if (navigationContentContainer === null) {
    throw new Error("The navigation-content-container was not found");
  }

  if (bodyContentContainer === null) {
    throw new Error("The content-container was not found");
  }

  const getState = (): Observable<rootState> => {
    return new Observable((observer) => {
      observer.next(store.getState());
      const unsubscribe = store.subscribe(() => {
        observer.next(store.getState());
      });
      return unsubscribe;
    });
  };

  const store$ = getState();

  m.mount(headerContentContainer, {
    view: () =>
      m(header, {
        store$,
      }),
  });

  m.mount(navigationContentContainer, {
    view: () =>
      m(navigation, {
        store$,
      }),
  });

  m.route.prefix = "#";

  m.route(bodyContentContainer, "/", {
    "/login": {
      view: () =>
        m(enterInfo, {
          store$,
        }),
    },
    "/": {
      view: () =>
        m(loggedInRouter, {
          store$,
          childComponent: m(mainPage, {
            store$,
          }),
        }),
    },
    "/room/:key": {
      view: () =>
        m(loggedInRouter, {
          store$,
          childComponent: m(gameContainer, {
            store$,
            roomId: m.route.param("key"),
          }),
        }),
    },
  });
};

initApp();
