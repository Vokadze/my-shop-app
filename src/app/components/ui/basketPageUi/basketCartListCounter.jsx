import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaPlus } from "react-icons/fa6";
import { HiMinus } from "react-icons/hi";
import basketService from "../../../service/basket.servise";
import { useDispatch, useSelector } from "react-redux";
import {
    getBasketById,
    getDecrement,
    getIncrement,
    loadBasketList
} from "../../../store/basket";
import { selectCount } from "../../../store/counterSlice";

function initialCount() {
    const count = useSelector(selectCount);
    return Number(count);
}

const BasketCartListCounter = ({ product }) => {
    const [counter, setCounter] = useState(initialCount());

    const dispatch = useDispatch();

    const { _id, count } = useSelector(getBasketById(product._id));

    useEffect(() => {
        dispatch(loadBasketList(product));
    }, [count, counter]);

    const formatCount = () => {
        return product.countPay !== 0 ? counter - 1 : product.countPay;
    };

    const handleIncrement = () => {
        // setCounter((prev) => prev + 1);
        setCounter(counter + 1);
        dispatch(getIncrement({ _id, counter, count, product }));
        basketService.incCount(_id, counter, count, product);
    };

    const handleDecrement = () => {
        dispatch(getDecrement({ _id, counter, count, product }));
        basketService.decCount(_id, counter, count, product);
        // setCounter((prev) => prev - 1);
        setCounter(counter - 1);
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
            <div>
                <span className="badge bg-primary mx-2">
                    {product.countPay !== 0 ? product.countPay : formatCount()}
                </span>
            </div>
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
    ]),
    handleIncrement: PropTypes.func,
    handleDecrement: PropTypes.func
};

export default BasketCartListCounter;
