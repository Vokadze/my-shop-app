import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaPlus } from "react-icons/fa6";
import { HiMinus } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getBasketById, loadBasketList } from "../../../store/basket";
import basketService from "../../../service/basket.servise";
import {
    getCountDecrement,
    getCountIncrement,
    selectCount
} from "../../../store/counterSlice";

function initialCount() {
    const count = useSelector(selectCount);
    return Number(count);
}

const BasketCartListCounter = ({ product }) => {
    const dispatch = useDispatch();

    const [counter, setCounter] = useState(initialCount());

    const { _id, count, countPay } = useSelector(getBasketById(product._id));

    useEffect(() => {
        dispatch(loadBasketList(product));
        setCounter(counter);
    }, [counter, countPay]);

    const handleIncrement = async () => {
        await basketService.updateCount(product);
        dispatch(getCountIncrement(_id, counter, count));
        await basketService.incCount(_id, counter, count, product);
        setCounter((prev) => prev + 1);
    };

    const handleDecrement = async () => {
        await basketService.updateCount(product);
        await basketService.decCount(_id, counter, count, product);
        dispatch(getCountDecrement(_id, counter, count));
        setCounter((prev) => prev - 1);
    };

    return (
        <>
            <div onClick={handleDecrement} role="button">
                <HiMinus
                    size={20}
                    style={{
                        background: "#ffc107",
                        borderRadius: 25
                    }}
                />
            </div>
            <span className="badge bg-primary mx-2">{product.countPay}</span>
            <div onClick={handleIncrement} role="button">
                <FaPlus
                    size={20}
                    style={{
                        background: "#ffc107",
                        borderRadius: 25
                    }}
                />
            </div>{" "}
        </>
    );
};

BasketCartListCounter.propTypes = {
    product: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.object
    ])
};

export default BasketCartListCounter;
