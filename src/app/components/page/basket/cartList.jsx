import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CartListItem from "./cartListItem";

const CartList = ({ onAddProduct }) => {
    const [productsItems, setProductItems] = useState([]);
    const onRemoveProduct = (product) => {
        const exist = productsItems.find((p) => p.id === product.id);
        if (exist.qty === 1) {
            const newCartProducts = productsItems.filter(
                (p) => p.id !== product.id
            );
            setProductItems(newCartProducts);
            localStorage.setItem(
                "productsItems",
                JSON.stringify(newCartProducts)
            );
        } else {
            const newCartProducts = productsItems.map((p) =>
                p.id === product.id ? { ...exist, qty: exist.qty - 1 } : p
            );
            setProductItems(newCartProducts);
            localStorage.setItem(
                "productsItems",
                JSON.stringify(newCartProducts)
            );
        }
    };

    useEffect(() => {
        setProductItems(
            localStorage.getItem("productsItems")
                ? JSON.parse(localStorage.getItem("productsItems"))
                : []
        );
    }, []);
    return (
        <>
            <h1>Cart List</h1>
            <ul>
                <li>
                    <CartListItem
                        onAddProduct={onAddProduct}
                        onRemoveProduct={onRemoveProduct}
                    />
                </li>
            </ul>
        </>
    );
};

CartList.propTypes = {
    onAddProduct: PropTypes.func
};

export default CartList;
