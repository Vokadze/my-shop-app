import React from "react";
import { useParams } from "react-router-dom";

import ProductsListPage from "../components/page/productsListPage";
import BasketShopPage from "../components/page/basketShopPage";
import ProductProvider from "../hook/useProducts";

const Products = () => {
    const params = useParams();
    const { prodId } = params;

    return (
        <>
            <ProductProvider>
                {prodId ? (
                    <BasketShopPage prodId={prodId} />
                ) : (
                    <ProductsListPage />
                )}
            </ProductProvider>
        </>
    );
};

export default Products;
