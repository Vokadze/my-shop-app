import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import NavBar from "../components/ui/navBar";
import BasketCartList from "../components/page/basket/basketCartList";
import BasketOrder from "../components/page/basket/basketOrder";

const BasketHeader = () => {
    const [productLocal, setProductLocal] = useState();
    console.log("basketHeader.jsx productLocal useState", productLocal);
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

BasketHeader.propTypes = {
    onAddProduct: PropTypes.func,
    onRemoveProduct: PropTypes.func
};

export default BasketHeader;
