import m from "mithril";
import "./styles.css"
import { header } from "components/header/header";
import { gamePage } from "pages/gamePage/game-page";
import { enterInfo } from "pages/enterInfo/enter-info";
import { store, storeType } from "state/store";
import { rootState } from "state/types";
import { Observable } from "rxjs";
import { InitUserData, UpdateUsername } from "state/UserData/actions";

const initApp = async() => {
    await initDispatch();
    console.log(store.getState())
    createApp();
}

const initDispatch = async() => {
    store.dispatch(InitUserData(undefined));
    return;
}

const createApp = () => {
    const bodyContentContainer = document.getElementById("body-content-container");
    const headerContentContainer = document.getElementById("header-content-container");
    if(headerContentContainer === null){
        throw new Error("The header-content-container was not found")
    }
    
    if(bodyContentContainer === null){
        throw new Error("The content-container was not found")
    }

    const getState = (): Observable<rootState>  => {
        return new Observable((observer) => {
            observer.next(store.getState());
            const unsubscribe = store.subscribe(() => {
                observer.next(store.getState());
            })
            return unsubscribe;
        })
    }
    
    const store$ = getState();
    
    m.mount(headerContentContainer, {
        view: () => m(header, 
            {
                store$
            }) 
    
    });
    
    m.route.prefix = "#";
    
    m.route(bodyContentContainer, "/", {
        "/": enterInfo,
        "/game-page": {
            view: () => m(gamePage, {
                store$
            })
        },
    })
}

initApp();