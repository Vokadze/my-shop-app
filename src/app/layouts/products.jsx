import React from "react";
import { useParams } from "react-router-dom";
import ProductPage from "../components/page/productPage";
import ProductsListPage from "../components/page/productsListPage";
import BasketHeader from "../components/page/basketProductsPage/basketHeader";

const Products = () => {
    const params = useParams();
    const { prodId, edit } = params;

    return (
        <>
            {prodId ? (
                edit ? (
                    <BasketHeader />
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
