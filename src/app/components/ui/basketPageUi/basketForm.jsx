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
// import NavBar from "../navBar";

const BasketForm = ({ handleIncrement, handleDecrement }) => {
    const dispatch = useDispatch();

    const productsItems = useSelector(getBaskets());
    // console.log(productsItems);

    useEffect(() => {
        dispatch(loadBasketList(productsItems));
    }, []);

    const handleDelete = (prodId) => {
        // console.log("basketForm delete", prodId);
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
                {/* <NavBar countCartItems={productsItems.length}/> */}
                <div className="d-flex flex-column w-100">
                    <h1>Корзина</h1>
                    <div className="d-flex flex-row">
                        <div className="row cols-row-1 cols-row-md-3 g-0">
                            <div className="col">
                                {productsItems.length !== 0
                                    ? productsItems.map((product, index) => (
                                          <BasketCartList
                                              product={product}
                                              prodId={product._id}
                                              key={index}
                                              handleIncrement={() =>
                                                  handleIncrement(product._id)
                                              }
                                              handleDecrement={() =>
                                                  handleDecrement(product._id)
                                              }
                                              handleDelete={handleDelete}
                                              {...product}
                                          />
                                      ))
                                    : "Товары в корзине отсутствуют"}
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
    onRemoveProduct: PropTypes.func,
    handleIncrement: PropTypes.func,
    handleDecrement: PropTypes.func
};

export default BasketForm;
