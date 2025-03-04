import { createAction, createSlice } from "@reduxjs/toolkit";
import basketService from "../service/basket.servise";

const counterSlice = createSlice({
    name: "counter",
    initialState: {
        value: 0
    },
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        }
    }
});

const { reducer: counterReducer, actions } = counterSlice;
const { increment, decrement } = actions;

export const selectCount = (state) => state.counter.value;

export const countIncrementUpdateRequested = createAction(
    "counter/countIncrementUpdateRequesteexport"
);
export const countDecrementUpdateRequested = createAction(
    "counter/countDecrementUpdateRequested"
);

export const getCountIncrement =
    ({ _id, counter, count }) =>
    async (dispatch) => {
        dispatch(countIncrementUpdateRequested());
        try {
            const { content } = await basketService.incCount(
                _id,
                counter,
                count
            );
            dispatch(increment(content));
        } catch (error) {
            console.log(error.message);
        }
    };

export const getCountDecrement =
    ({ _id, counter, count }) =>
    async (dispatch) => {
        console.log(counter);
        dispatch(countDecrementUpdateRequested());
        try {
            const { content } = await basketService.incCount(
                _id,
                counter,
                count
            );
            // if (counter < 0) {
            //     counter = 0;
            // };
            dispatch(decrement(content));
        } catch (error) {
            console.log(error.message);
        }
    };

export default counterReducer;
