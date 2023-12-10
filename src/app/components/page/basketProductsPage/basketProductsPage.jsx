import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import ProductPage from "../productPage";
import api from "../../../api";

const BasketProductsPage = () => {
    const [productsItems, setProductsItems] = useState([]);
    console.log("basketProductsPage.jsx useState productsItems", productsItems);
    const { prodId } = useParams();

    // useEffect(() => {
    //     const saved = JSON.parse(localStorage.getItem("productItems"));
    //     setProductItems(saved);
    // }, []);

    useEffect(() => {
        api.products.update(prodId).then((data) => setProductsItems(data));
    }, []);

    const addProductsCart = (product) => {
        console.log("add");
    };

    if (productsItems) {
        return (
            <>
                <h1>Basket Products Page</h1>
                <h1>id: {prodId}</h1>
                <ProductPage
                    prodId={prodId}
                    onAddProductCart={addProductsCart}
                />
            </>
        );
    } else {
        return "loading basketProductsPage.jsx";
    }
};

// BasketProductsPage.propTypes = {
//     productCart: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
// };

export default BasketProductsPage;
