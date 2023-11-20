import React from "react";
import { useParams } from "react-router-dom";
import ProductPage from "../components/page/productPage";
import ProductsListPage from "../components/page/productsListPage";

const Products = () => {
    const params = useParams();
    const { prodId } = params;
    return (
        <>{prodId ? <ProductPage prodId={prodId} /> : <ProductsListPage />}</>
    );
};

export default Products;
