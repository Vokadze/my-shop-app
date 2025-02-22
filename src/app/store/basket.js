import { createAction, createSlice } from "@reduxjs/toolkit";
import basketService from "../service/basket.servise";

const basketSlice = createSlice({
    name: "basket",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
        // value: 3,
        // lastFetch: null
    },
    reducers: {
        basketRequested: (state) => {
            state.isLoading = true;
        },
        basketReceved: (state, action) => {
            state.entities = action.payload;
            // state.lastFetch = Date.now();
            state.isLoading = false;
        },
        basketRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        basketCountUpdateSuccessed: (state, action) => {
            state.entities[
                state.entities.findIndex((p) => p._id === action.payload._id)
            ] = action.payload;
        },
        basketCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload._id);
        },
        // increment: (state) => {
        //     state.entities = state.value;
        //     state.value += 1;
        // },
        incDec: (state, action) => {
            state.entities[
                state.entities.findIndex((p) => p._id === action.payload)
            ] = action.payload;
            // state.entities.push(action.payload._id);
            // const { _id } = action.payload;
            // console.log(_id);
            // if (state.entities === _id) {
            //     console.log(state.entities);
            // }
            // state.entities[_id].push(countPay);
            // console.log(state.entities[_id].push(countPay));
            // if (action.payload) {
            // state.entities = state.entities.filter(
            //     (p) => p._id !== action.payload
            // );
            // state.push(action.payload);
            // }
            // ===
            // const product = state.entities.find((p) => p._id === action.payload);
            // if (product) {
            //     product.completed = !product.completed;
            // }
            // ===
            // const { _id, countPay } = action.payload;
            // if (!state.entities[_id]) {
            //     console.log(!state.entities[_id]);
            //     state.entities[_id] = [];
            //     console.log(state.entities[_id]);
            // };
            // state.entities[_id].push(countPay);
            // console.log(state.entities[_id].push(countPay));
        },
        removeBasket: (state, action) => {
            state.entities = state.entities.filter(
                (p) => p._id !== action.payload
            );
        }
    }
});

const { reducer: basketReducer, actions } = basketSlice;
const {
    basketRequested,
    basketReceved,
    basketRequestFiled,
    // basketCountUpdateSuccessed,
    basketCreated,
    incDec,
    // incBasket,
    removeBasket
} = actions;

const addNewBasketRequested = createAction("basket/addNewBasketRequested");
const removeBasketRequested = createAction("basket/removeBasketRequested");
const basketCountIncrementUpdateRequested = createAction(
    "basket/basketCountIncrementUpdateRequested"
);
const basketCountDecrementRequested = createAction(
    "basket/basketCountDecrementRequested"
);
const basketUpdateFailed = createAction("basket/basketUpdateFailed");
// const selectCount = (state) => state.basket.value;
// const setData = createAction("setData", (data) => ({ payload: data }));

export const loadBasketList = () => async (dispatch) => {
    // const { lastFetch } = getState().basket;
    // if (isOutdated(lastFetch)) {
    dispatch(basketRequested());
    try {
        const { content } = await basketService.fetchAll();
        console.log(content);
        // dispatch(createBasket(content));
        dispatch(basketReceved(content));
    } catch (error) {
        dispatch(basketRequestFiled());
    }
    // }
};

export const getBasketById = (prodId) => (state) => {
    if (state.basket.entities) {
        return state.basket.entities.find((p) => p._id === prodId);
    }
};

export const getBaskets = () => (state) => state.basket.entities;

export const createBasket =
    ({ _id, ...data }) =>
    async (dispatch) => {
        dispatch(addNewBasketRequested(data));
        try {
            const { content } = await basketService.getBasket(_id, data);
            console.log(content);
            dispatch(basketCreated(content));
        } catch (error) {
            dispatch(basketRequestFiled(error.message));
        }
    };

export const getBasketDeleteIds = (id) => async (dispatch) => {
    dispatch(removeBasketRequested());
    try {
        const { content } = await basketService.deleteBasket(id);
        console.log(content);
        if (content === null) {
            dispatch(removeBasket(id));
        }
    } catch (error) {
        dispatch(basketRequestFiled(error.message));
    }
};

export const getIncrement =
    ({ _id, counter, count, ...payload }) =>
    async (dispatch) => {
        console.log("basket.js getIncrement _id", _id);
        console.log("basket.js getIncrement counter", counter);
        console.log("basket.js getIncrement count", count);
        // console.log("basket.js getIncrement countPay", countPay);
        console.log("basket.js getIncrement payload", payload);
        dispatch(basketCountIncrementUpdateRequested());
        try {
            // if (countPay >= 1) {
                // const newCount = {
                //     count: `${count}` - `${counter}`
                const { content } = await basketService.incCount(
                    ...payload,
                    _id,
                    count,
                    counter
                );
                console.log(content);
                // dispatch(increment(content));
                dispatch(incDec(content));
                // }
            // }
            // dispatch(basketReceved(content));
        } catch (error) {
            dispatch(basketUpdateFailed(error.message));
            // dispatch(basketRequestFiled(error.message));
        }
    };

export const getDecrement =
    ({ _id, counter, count, ...payload }) =>
    async (dispatch) => {
        console.log("basket.js getDecrement _id", _id);
        console.log("basket.js getDecrement counter", counter);
        console.log("basket.js getDecrement count", count);
        console.log("basket.js getDecrement payload", payload);
        dispatch(basketCountDecrementRequested());
        try {
            const { content } = await basketService.decCount(
                ...payload,
                _id,
                count,
                counter
            );
            console.log(content);
            dispatch(incDec(content));
        } catch (error) {
            dispatch(basketUpdateFailed(error.message));
            // dispatch(basketRequestFiled(error.message));
        }
    };

// export const getIncrement =
//     (_id, counter, countPay, payload) => async (dispatch) => {
//         console.log("basket.js getIncrement data", _id);
//         console.log("basket.js getIncrement counter", counter);
//         console.log("basket.js getIncrement countPay", countPay);
//         console.log("basket.js getIncrement payload", payload);
//         // console.log("basket.js getIncrement _id", _id);
//         dispatch(basketCountUpdateRequested());
//         try {
//             // const counter = dispatch(selectCount);
//             const data = {
//                 countPay: counter,
//                 ...payload
//             };
//             console.log(data);
//             const { content } = basketService.incDate(data);
//             console.log(content);
//             dispatch(increment(content));
//             // dispatch(setData(content));
//             // dispatch(incBasket(content));
//             console.log(content);
//         } catch (error) {
//             basketUpdateFailed(error.message);
//     }
//     };
export default basketReducer;
