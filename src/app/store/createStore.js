import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categories";
import productsReducer from "./products";

const rootReducers = combineReducers({
    categories: categoriesReducer,
    products: productsReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducers
    });
}
