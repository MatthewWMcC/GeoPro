import { Store, compose, createStore } from "redux";
import { rootReducer } from "./root";
import { rootState } from "./types";
export type storeType = typeof store;

export const configureStore = (): Store<rootState> => {
    return createStore(rootReducer);
}

export const store: Store<rootState> = configureStore();