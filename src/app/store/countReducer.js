const initialState = {
    counter: 0
};

const countReducer = (state = initialState, action) => {
    switch (action.type) {
        case "INCREMENT_COUNTER":
            return {
                ...state,
                counter: state.counter + 1
            };
        case "DECREMENT_COUNTER":
            return {
                ...state,
                counter: state.counter > 0 ? state.counter - 1 : 0
            };
        default:
            return state;
    }
};

export const incrementCounter = () => ({
    type: "INCREMENT_COUNTER"
});

export const decrementCounter = () => ({
    type: "DECREMENT_COUNTER"
});

export default countReducer;
