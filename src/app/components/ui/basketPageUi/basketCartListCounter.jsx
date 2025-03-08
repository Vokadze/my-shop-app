import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaPlus } from "react-icons/fa6";
import { HiMinus } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
// import { useDispatch, useSelector } from "react-redux";
import {
    getBasketById,
    getBasketCountById,
    loadBasketList
} from "../../../store/basket";
// // import basketService from "../../../service/basket.servise";
import {
    getCountDecrement,
    getCountIncrement,
    //     getCountDecrement,
    //     getCountIncrement,
    selectCount
} from "../../../store/counterSlice";
import basketService from "../../../service/basket.servise";
// import basketService from "../../../service/basket.servise";

function initialCount() {
    const count = useSelector(selectCount);
    return Number(count);
}

const BasketCartListCounter = ({ prodId }) => {
    // console.log(product);
    console.log(prodId);

    const [counter, setCounter] = useState(initialCount());
    console.log(counter);
    // const [counter, setCounter] = useState(initialCount());
    // console.log(counter);

    const dispatch = useDispatch();

    const product = useSelector(getBasketById(prodId));

    // const productsNew = useSelector(getBasketById(product._id));
    // console.log(productsNew);

    const products = useSelector(getBasketCountById(prodId));
    console.log(products);

    useEffect(() => {
        dispatch(loadBasketList(products));
    }, [counter]);

    const formatCount = () => {
        return counter === 0 ? counter : product.countPay;
    };
    // const formatCounter = () => {
    //     // return counter !== 0 ? product.countPay : counter;
    //     return product.countPay === 0 ? counter : product.countPay;
    //     // return counter !== 0 ? product.countPay : counter;
    // };

    const getBadgeClasses = () => {
        let classes = "badge mx-2 ";
        classes += counter === 0 ? "bg-danger" : "bg-primary";
        return classes;
    };

    const handleIncrement = async () => {
        const { count } = product;
        console.log({ count });

        await basketService.updateCount(product);
        dispatch(getCountIncrement(prodId, counter, count));
        await basketService.incCount(prodId, counter, count, product);
        setCounter((prevState) => prevState + 1);
    };

    const handleDecrement = async () => {
        const { count } = product;
        console.log({ count });

        if (counter < 0) {
            const counter = 0;
            await basketService.updateCount(product);
            dispatch(getCountDecrement(prodId, counter, count));
            await basketService.decCount(prodId, counter, count, product);
            setCounter((prevState) => prevState - 1);
        } else if (counter > 0) {
            await basketService.updateCount(product);
            dispatch(getCountDecrement(prodId, counter, count));
            await basketService.decCount(prodId, counter, count, product);
            setCounter((prevState) => prevState - 1);
        }
    };

    useEffect(() => {
        setCounter(counter - counter);
    }, [prodId]);

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
            <span className={getBadgeClasses()}>{formatCount()}</span>
            <div onClick={handleIncrement} role="button">
                <FaPlus
                    size={20}
                    style={{
                        background: "#ffc107",
                        borderRadius: 25
                    }}
                />
            </div>
        </>
    );
};

BasketCartListCounter.propTypes = {
    product: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.object
    ]),
    prodId: PropTypes.string
};

export default BasketCartListCounter;
