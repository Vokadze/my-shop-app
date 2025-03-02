import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { FaPlus } from "react-icons/fa6";
import { HiMinus } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getBasketById, loadBasketList } from "../../../store/basket";
import basketService from "../../../service/basket.servise";
import { getCountDecrement, getCountIncrement } from "../../../store/counterSlice";

const BasketCartListCounter = ({ product, prodId }) => {
    console.log(product);
    console.log({ prodId });

    const dispatch = useDispatch();

    // const counter = useSelector((state) => state.counter.value);
    // console.log(counter);
    const counter = useSelector((state) => state.counter.value);
    console.log(counter);

    const { _id, count, countPay } = useSelector(getBasketById(product._id));
    console.log({ _id });
    console.log({ count });
    console.log({ countPay });

    useEffect(() => {
        // basketService.updateCount(product);
        dispatch(loadBasketList(product));
    }, [counter, countPay]);

    const handleIncrement = (prod) => {
        console.log("handleIncrement", prod);
        basketService.incCount(_id, counter, count, product);
        dispatch(getCountIncrement(_id, counter, count));
    };

    const handleDecrement = (prod) => {
        console.log("handleDecrement", prod);
        basketService.decCount(_id, counter, count, product);
        dispatch(getCountDecrement(_id, counter, count));
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
    ]),
    prodId: PropTypes.string
};

export default BasketCartListCounter;
