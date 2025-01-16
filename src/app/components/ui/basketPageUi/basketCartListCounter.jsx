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
// import { increment, selectCount } from "../../../store/counterSlice";

function initialCount() {
    const count = useSelector(selectCount);
    return Number(count);
    // return Math.floor(Math.random() * (count - count + 1) + count);
}

const BasketCartListCounter = ({
    product
    // handleIncrement,
    // handleDecrement
}) => {
    console.log(product);

    const [counter, setCounter] = useState(initialCount());
    console.log(counter);

    const dispatch = useDispatch();

    const { _id, count, countPay } = useSelector(getBasketById(product._id));
    console.log(_id);
    console.log(countPay);
    console.log(count);

    useEffect(() => {
        // const newCount = useSelector(getBaskets(product));
        dispatch(loadBasketList(product));
        //     setCounter(counter);
    }, [countPay]);

    // useEffect(() => {
    //     setCounter(counter + 1);
    // }, []);

    // const { _id, countPay } = product;
    // console.log(countPay);

    const handleIncrement = () => {
        //     console.log("handleIncrement", prod);
        setCounter((prev) => prev + 1);
        // setCounter(counter + 1);
        dispatch(getIncrement({ _id, counter, count, countPay, product }));
        basketService.incCount(_id, counter, count, countPay, product);
        // dispatch(getProductIncrement(product));
        // if (product.countPay >= 1) {
        //     console.log(product.countPay);

        //     const newLocalPay = productsItems.filter(
        //         (product) => product.count === product.count--
        //     );
        // localStorage.setItem("productsItems", JSON.stringify(newLocalPay));
        // }
        // setCountProduct(product.countPay++);
    };

    const handleDecrement = () => {
        dispatch(getDecrement({ _id, counter, countPay, product }));
        basketService.decCount(_id, counter, countPay, product);
        setCounter((prev) => prev - 1);
        // if (product.countPay <= 1) {
        //     const newLocalPay = productsItems.filter(
        //         (product) => product.count === product.count++
        //     );
        //     localStorage.setItem("productsItems", JSON.stringify(newLocalPay));
        // }
        // setCountProduct(product.countPay--);
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
            {/* <span className="badge bg-primary mx-2">
                {counter ? product.countPay : counter}
            </span> */}
            <div>
            {/* <span className="badge bg-primary mx-2">
                {counter}
            </span> */}
            <span className="badge bg-primary mx-2">
                {product.countPay || counter}
            </span>
            </div>
            {/* <span className="badge bg-primary mx-2">{counter}</span> */}
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
