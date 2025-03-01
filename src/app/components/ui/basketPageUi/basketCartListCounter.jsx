import React from "react";
import PropTypes from "prop-types";
import { FaPlus } from "react-icons/fa6";
import { HiMinus } from "react-icons/hi";
import { useSelector } from "react-redux";

const BasketCartListCounter = ({ product }) => {
    console.log(product);

    const count = useSelector((state) => state.counter.value);
    console.log(count);

    const handleIncrement = (prod) => {
        console.log("handleIncrement", prod);
    };

    const handleDecrement = (prod) => {
        console.log("handleDecrement", prod);
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
