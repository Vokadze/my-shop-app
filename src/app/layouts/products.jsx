import React from "react";
import { useParams } from "react-router-dom";
import ProductPage from "../components/page/productPage";
import ProductsListPage from "../components/page/productsListPage";
import CartList from "../components/page/basket/cartList";

const Products = () => {
    const params = useParams();
    const { prodId, edit } = params;
    return (
        <>
            {prodId ? (
                edit ? (
                    <CartList />
                ) : (
                    <ProductPage prodId={prodId} />
                )
            ) : (
                <ProductsListPage />
            )}
        </>
    );
};

export default Products;
