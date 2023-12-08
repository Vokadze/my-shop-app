import React from "react";
import { useParams } from "react-router-dom";
import ProductPage from "../components/page/productPage";
import ProductsListPage from "../components/page/productsListPage";
// import BasketProductsPage from "../components/page/basketProductsPage/basketProductsPage";
import Basket from "../components/page/basketProductsPage/basket";

const Products = () => {
    const params = useParams();
    const { prodId, edit } = params;

    // <>{prodId ? <ProductPage prodId={prodId} /> : <ProductsListPage />}</>

    return (
        <>
            {prodId ? (
                edit ? (
                    <Basket />
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
