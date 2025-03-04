import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaPlus } from "react-icons/fa6";
import { HiMinus } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getBasketById, loadBasketList } from "../../../store/basket";
// import basketService from "../../../service/basket.servise";
import {
    getCountDecrement,
    getCountIncrement,
    selectCount
} from "../../../store/counterSlice";
import basketService from "../../../service/basket.servise";

function initialCount() {
    const count = useSelector(selectCount);
    return Number(count);
}

const BasketCartListCounter = ({ product, prodId }) => {
    // console.log(prodId);

    const dispatch = useDispatch();

    const [counter, setCounter] = useState(initialCount());
    // console.log(counter);

    const productsNew = useSelector(getBasketById(product._id));
    // console.log(productsNew);

    // const products = useSelector(getBasketCountById(prodId));
    // console.log(products);

    useEffect(() => {
        dispatch(loadBasketList(productsNew));
        setCounter(counter);
    }, [counter]);

    const formatCounter = () => {
        return product.countPay !== 0 ? counter - 1 : product.countPay;
        // return counter !== 0 ? product.countPay : counter;
    };

    const handleIncrement = async () => {
        // console.log(products);
        console.log(productsNew);

        const { count } = productsNew;
        // console.log({ _id });
        console.log({ count });

        // dispatch(getBasketById(prodId));
        await basketService.updateCount(productsNew);
        dispatch(getCountIncrement(productsNew._id, counter, count));
        await basketService.incCount(
            productsNew._id,
            counter,
            count,
            productsNew
        );
        setCounter((prev) => prev + 1);
        // // setCounter((counter) => counter + 1);
        // setCounter(counter + 1);
    };

    const handleDecrement = async () => {
        console.log(productsNew);

        const { count } = productsNew;
        console.log({ count });
        await basketService.updateCount(productsNew);
        // // setCounter((counter) => counter - 1);
        // if (counter < 0) {
            //     const counter = 0;
            //     const newCount = count - 1;
            dispatch(getCountDecrement(productsNew._id, counter, count));
            await basketService.decCount(
                productsNew._id,
                counter,
                count,
                productsNew
            );
            setCounter((prev) => prev - 1);
        // } else if (counter > 0) {
            // setCounter(counter - 1);
        //     await basketService.decCount(_id, counter, count, product);
        //     dispatch(getCountDecrement(_id, counter, count));
        // }
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
            <span className="badge bg-primary mx-2">{formatCounter()}</span>
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
    prodId: PropTypes.string
};

export default BasketCartListCounter;
