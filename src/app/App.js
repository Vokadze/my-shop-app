import React, { useEffect, useState } from "react";

import Products from "./components/products";
import api from "./api";

const App = () => {
    const [products, setProducts] = useState();
    console.log("products App.jsx", products);

    useEffect(() => {
        api.products.fetchAll().then((data) => setProducts(data));
    }, []);

    // useEffect(() => {
    //     api.products.fetchAll().then((data) => setProducts(data));
    // }, []);

    const handleChange = (prodId) => {
        setProducts(products.filter((product) => product.id === prodId));
    };

    return (
        <div>
            {products && (
            // <h1>App</h1>
            <Products handleChange={handleChange} products={products} />
            )}
        </div>
    );
};

export default App;
