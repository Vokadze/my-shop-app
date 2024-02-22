import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import productService from "../service/product.service";

const ProductContext = React.createContext();

export const useProduct = () => {
    return useContext(ProductContext);
};

const ProductProvider = ({ children }) => {
    console.log(children);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    console.log(products);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        try {
            const { content } = await productService.get();
            console.log(content);
            setProducts(content);
            setIsLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
        setIsLoading(false);
    }

    // function getProductById(prodId) {
    //     return products.find((p) => p.id === prodId);
    // }

    return (
        <ProductContext.Provider value={{ products }}>
            {/* {children} */}
            {!isLoading ? children : "loading useProducts.jsx..."}
        </ProductContext.Provider>
    );
};

ProductProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProductProvider;
