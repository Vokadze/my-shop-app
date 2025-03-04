import React, { useEffect } from "react";
import PropTypes from "prop-types";

import BasketCartList from "../../page/basketPageList/basketCartList/basketCartList";
import BasketOrder from "../../page/basketPageList/basketCartList/basketOrder";
// import basketService from "../../../service/basket.servise";
import { useDispatch, useSelector } from "react-redux";
import {
    getBasketDeleteIds,
    getBaskets,
    loadBasketList
} from "../../../store/basket";

const BasketForm = () => {
    const dispatch = useDispatch();

    const productsItems = useSelector(getBaskets());

    useEffect(() => {
        dispatch(loadBasketList(productsItems));
    }, []);

    const handleDelete = (prodId) => {
        console.log("basketForm delete", prodId);
        dispatch(getBasketDeleteIds(prodId));
    };

    const itemPrice = () => {
        const newOrderPay = productsItems
            .reduce((a, c) => a + c.countPay * c.price, 0)
            .toFixed(2);
        return newOrderPay;
    };

    const handleClick = () => {
        console.log("click");
    };
    if (productsItems) {
        return (
            <div className="d-flex justify-content-center">
                <div className="d-flex flex-column w-100">
                    <h1>Корзина</h1>
                    <div className="d-flex flex-row">
                        <div className="row cols-row-1 cols-row-md-3 g-0">
                            <div className="col">
                                {productsItems.map((product, index) => (
                                    <BasketCartList
                                        product={product}
                                        key={index}
                                        productsItems={productsItems}
                                        handleDelete={handleDelete}
                                        {...product}
                                    />
                                ))}
                            </div>
                        </div>
                        <BasketOrder
                            itemPrice={itemPrice}
                            productsItems={productsItems}
                            handleClick={handleClick}
                        />
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <>
                <h1>Корзина пуста</h1>
            </>
        );
    }
};

BasketForm.propTypes = {
    prodId: PropTypes.string,
    onAddProduct: PropTypes.func,
    onRemoveProduct: PropTypes.func
};

export default BasketForm;
