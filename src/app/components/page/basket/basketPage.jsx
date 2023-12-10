import React from "react";
import { useParams } from "react-router-dom";
import ProductPage from "../productPage";
import CartList from "./cartList";

const BasketPage = ({ onAddProduct, onRemoveProduct }) => {
    const { prodId } = useParams();
    return (
        <>
            <h1>BasketPage</h1>
            <ProductPage prodId={prodId} onAddProduct={onAddProduct} />
            <CartList
                productsItems={productsItems}
                onAddProduct={onAddProduct}
                onRemoveProduct={onRemoveProduct}
            />
        </>
    );
};

export default BasketPage;
