import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import NavBar from "./navBar";
import BasketCartList from "../page/basketCartList/basketCartList";
import BasketOrder from "../page/basketCartList/basketOrder";

const BasketForm = () => {
    const [productLocal, setProductLocal] = useState();
    console.log("basket.jsx productLocal useState", productLocal);
    const newProductsItem = localStorage.getItem("productsItems");
    const productsItems = JSON.parse(newProductsItem);
    console.log(productsItems);

    useEffect(() => {
        console.log(productsItems);
    }, []);

    const handleDelete = (prodId) => {
        console.log("click");
        if (productsItems) {
            const newLocal = productsItems.filter(
                (product) => product.id !== prodId
            );
            localStorage.setItem("productsItems", JSON.stringify(newLocal));
            setProductLocal(newLocal);
        }
    };

    const handleIncrement = (id) => {
        console.log("add");
        const elementIndex = productsItems.findIndex(
            (product) => product.id === id
        );
        const newCounters = [...productsItems];
        newCounters[elementIndex].countPay++;
        setProductLocal(newCounters);
    };

    const handleDecrement = (id) => {
        console.log("add");
        const elementIndex = productsItems.findIndex(
            (product) => product.id === id
        );
        const newCounters = [...productsItems];
        newCounters[elementIndex].countPay--;

        setProductLocal(newCounters);
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
            <div className="d-flex justify-content-center px-4">
                <div className="d-flex flex-column w-100">
                    <div className="d-flex flex-column">
                        <NavBar countCartItems={productsItems.length} />
                    </div>
                    <h1>Корзина</h1>
                    <div className="d-flex flex-row">
                        <div className="row cols-row-1 cols-row-md-3 g-0">
                            <div className="col">
                                {productsItems.map((product) => (
                                    <BasketCartList
                                        product={product}
                                        key={product.id}
                                        handleIncrement={handleIncrement}
                                        handleDecrement={handleDecrement}
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
    onAddProduct: PropTypes.func,
    onRemoveProduct: PropTypes.func
};

export default BasketForm;
