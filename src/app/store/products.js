import { createSlice } from "@reduxjs/toolkit";
import productService from "../service/product.service";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        productsRequested: (state) => {
            state.isLoading = false;
        },
        productsReceved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        productsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: productsReducer, actions } = productsSlice;
const { productsRequested, productsReceved, productsRequestFiled } = actions;

function isOutdated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    }
    return false;
}

export const loadProductsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().products;
    console.log(lastFetch);
    if (isOutdated(lastFetch)) {
        dispatch(productsRequested());
        try {
            const { content } = await productService.fetchAll();
            dispatch(productsReceved(content));
        } catch (error) {
            dispatch(productsRequestFiled(error.message));
        }
    }
};

export const getProductById = (prodId) => (state) => {
    if (state.products.entities) {
        return state.products.entities.find((p) => p._id === prodId);
    }
};

export const getProducts = () => (state) => state.products.entities;
export const getProductsLoadingStatus = () => (state) =>
    state.products.isLoading;

export const getProductChangeIds = (id) => (state) => {
    if (state.products.entities) {
        return state.products.entities.filter((p) => p._id === id);
    }
};

export const getProductDeleteIds = (prodId) => (state) => {
    if (state.products.entities) {
        return state.products.entities.filter((p) => p._id !== prodId);
    }
};

export default productsReducer;
