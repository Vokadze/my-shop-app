import React from "react";
import { useParams } from "react-router-dom";
import ProductPage from "../components/productPage";
import ProductsList from "../components/productsList";

const Products = () => {
    const params = useParams();
    const { prodId } = params;
    return <>{prodId ? <ProductPage prodId={prodId} /> : <ProductsList />}</>;
};

export default Products;
