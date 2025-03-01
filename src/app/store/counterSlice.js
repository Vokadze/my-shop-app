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
const { increment } = actions;

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const countIncrementUpdateRequested = createAction(
    "counter/countIncrementUpdateRequested"
);

export const getCountIncrement =
    ({ _id, counter }) =>
    async (dispatch) => {
        console.log("counterSlice getCountIncrement _id", _id);
        // console.log("counterSlice getCountIncrement newCount", newCount);
        // console.log("counterSlice getCountIncrement count", count);
        // console.log("counterSlice getCountIncrement countPay", countPay);
        // console.log("counterSlice getCountIncrement payload", data);
        dispatch(countIncrementUpdateRequested());
        try {
            const { content } = await basketService.incCount(_id, counter);
            console.log(content);
            dispatch(increment(content));
        } catch (error) {
            console.log(error.message);
        }
    };

export default counterReducer;
