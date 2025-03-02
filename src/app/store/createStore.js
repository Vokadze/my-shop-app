import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categories";
import productsReducer from "./products";
import usersReducer from "./users";
import basketReducer from "./basket";
import counterReducer from "./counterSlice";

const rootReducers = combineReducers({
    categories: categoriesReducer,
    products: productsReducer,
    users: usersReducer,
    basket: basketReducer,
    counter: counterReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducers
    });
}
