import { createAction, createSlice } from "@reduxjs/toolkit";
import basketService from "../service/basket.servise";

const basketSlice = createSlice({
    name: "basket",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
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
            state.entities.push(action.payload._id);
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
    basketCountUpdateSuccessed,
    basketCreated,
    removeBasket
} = actions;

const addNewBasketRequested = createAction("basket/addNewBasketRequested");
const removeBasketRequested = createAction("basket/removeBasketRequested");
const basketCountUpdateRequested = createAction(
    "basket/basketCountUpdateRequested"
);
const basketUpdateFailed = createAction("basket/basketUpdateFailed");

export const loadBasketList = () => async (dispatch) => {
    dispatch(basketRequested());
    try {
        const { content } = await basketService.fetchAll();
        console.log(content);
        // dispatch(createBasket(content));
        dispatch(basketReceved(content));
    } catch (error) {
        dispatch(basketRequestFiled());
    }
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
        dispatch(addNewBasketRequested());
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

export const getBasketCountUpdate =
    ({ _id, ...data }) =>
    async (dispatch) => {
        dispatch(basketCountUpdateRequested());
        try {
            const { content } = await basketService.getBasket(_id, data);
            console.log(content);
            dispatch(basketCountUpdateSuccessed(content));
        } catch (error) {
            dispatch(basketUpdateFailed(error.message));
        }
    };

// export const counterBasket = (state = {}, action) => {
//     switch (action.type) {
//         case "additemtoproduct":
//             return {
//                 ...state.entities,
//                 [action._id]: (state[action._id] || 0) + 1
//             };
//         case "deleteitemfromproduct":
//             return {
//                 ...state,
//                 [action._id]: (state[action._id] || 1) - 1
//             };
//         default:
//             return state;
//     }

//     addItemToCart: (state, action) => {
//         const currentAmout = state[action.payload] ?? 0;
//         state[action.payload] = currentAmout + 1;
//     },
//     incrementItemToCart: (state, action) => {
//         if (state[action.payload] > 1) {
//             state[action.payload]++
//         }
//     },
//     decrementItemToCart: (state, action) => {
//         if (state[action.payload] > 1) {
//             state[action.payload]--
//         }
//     }

export default basketReducer;
