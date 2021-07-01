import { Store, createStore, applyMiddleware } from "redux";
import logger from 'redux-logger';
import { rootReducer } from "./root";
export type storeType = typeof store;


export const configureStore = () => {
    return createStore(rootReducer,
        applyMiddleware(logger)
    );
}

export const store = configureStore();