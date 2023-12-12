import React from "react";
import { useParams } from "react-router-dom";
import ProductsListPage from "../components/page/productsListPage";
// import BasketHeader from "../components/page/basketProductsPage/basketHeader";
import BasketShopPage from "../components/page/basket";

const Products = () => {
    const params = useParams();
    const { prodId } = params;

    return (
        <>
            {prodId ? <BasketShopPage prodId={prodId} /> : <ProductsListPage />}
        </>
    );
};

export default Products;
