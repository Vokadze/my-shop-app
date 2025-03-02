import { createAction, createSlice } from "@reduxjs/toolkit";
import basketService from "../service/basket.servise";

// const initialState = {
//     value: 0
// };

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

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const countIncrementUpdateRequested = createAction(
    "counter/countIncrementUpdateRequested"
);
export const countDecrementUpdateRequested = createAction("counter/countDecrementUpdateRequested");

export const getCountIncrement =
    ({ _id, counter, count }) =>
    async (dispatch) => {
        console.log("counterSlice getCountIncrement _id", _id);
        // console.log("counterSlice getCountIncrement newCount", newCount);
        console.log("counterSlice getCountIncrement count", count);
        // console.log("counterSlice getCountIncrement countPay", countPay);
        // console.log("counterSlice getCountIncrement payload", data);
        dispatch(countIncrementUpdateRequested());
        try {
            const { content } = await basketService.incCount(
                _id,
                counter,
                count
            );
            console.log(content);
            dispatch(increment(content));
        } catch (error) {
            console.log(error.message);
        }
    };

export const getCountDecrement = ({ _id, counter, count }) => async (dispatch) => {
    console.log("counterSlice getCountIncrement _id", _id);
        // console.log("counterSlice getCountIncrement newCount", newCount);
        console.log("counterSlice getCountIncrement count", count);
        // console.log("counterSlice getCountIncrement countPay", countPay);
        // console.log("counterSlice getCountIncrement payload", data);
    dispatch(countDecrementUpdateRequested());
    try {
        const { content } = await basketService.incCount(_id, counter, count);
        console.log(content);
        dispatch(decrement(content));
    } catch (error) {
        console.log(error.message);
    }
};

export default counterReducer;
