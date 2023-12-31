import React from "react";
import PropTypes from "prop-types";

const BasketSearchStatus = ({ length }) => {
    console.log(length);
    const renderPhrase = (number) => {
        console.log(number);
        const lastOne = Number(number.toString().slice(-1));
        console.log(lastOne);
        if (number > 5 && number < 20) return "товаров";
        if (lastOne === 1) return "товар";
        if ([2, 3, 4].indexOf(lastOne) >= 0) return "товара";
        return "товаров";
    };

    return (
        <div className="mb-2">
            <span className="count-products">
                {length > 0
                    ? `${length + " " + renderPhrase(length)}`
                    : "Товаров в корзине нет"}
            </span>
        </div>
    );
};

BasketSearchStatus.propTypes = {
    length: PropTypes.number
};

export default BasketSearchStatus;
