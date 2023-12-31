import React from "react";
import PropTypes from "prop-types";

import BasketSearchStatus from "../../ui/basketSearchStatus";

const BasketOrder = ({ productsItems, handleClick, itemPrice }) => {
    console.log("BasketOrder.jsx productsItems", productsItems);

    const formatButton = () => {
        const classes = "btn btn-sm text-nowrap btn-warning ";
        return productsItems.length === 0 ? classes + "disabled" : classes;
    };

    return (
        <div className="col">
            <div
                className="card border border-warning mx-3"
                style={{ background: "#dee2e6" }}
            >
                <div className="cart-body mb-3">
                    <div className="mx-3">
                        <div className="mb-0 mt-4">Итого:</div>
                        <div className="mb-2">
                            <BasketSearchStatus length={productsItems.length} />
                        </div>
                        <div>Итоговая сумма:</div>
                        <div className="mb-5">${itemPrice()}</div>
                        <div className="text-center">
                            <button
                                className={formatButton()}
                                onClick={handleClick}
                            >
                                Оформить заказ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

BasketOrder.propTypes = {
    productsItems: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    handleClick: PropTypes.func,
    itemPrice: PropTypes.func
};

export default BasketOrder;
