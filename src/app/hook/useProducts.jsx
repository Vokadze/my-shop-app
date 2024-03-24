import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
// import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import productService from "../service/product.service";
// import httpService from "../service/http.service";
// import { nanoid } from "nanoid";
// import httpService from "../service/http.service";
// import { useAuth } from "./useAuth";

const ProductContext = React.createContext();

export const useProduct = () => {
    return useContext(ProductContext);
};

const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    // console.log(products);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const { content } = await productService.fetchAll();
                // console.log(content);
                setProducts(content);
                setIsLoading(false);
            } catch (error) {
                errorCatcher(error);
            }
        };
        getProducts();
    }, []);

    function getProductById(id) {
        return products.find((p) => p._id === id);
    }

    const updateProduct = async ({ _id, ...data }) => {
        try {
            const { content } = await productService.getProduct(_id, data);
            console.log(content);
            setProducts((prevState) =>
                prevState.map((item) => {
                    if (item._id === content._id) {
                        return item;
                    }
                    return item;
                })
            );
            return content;
        } catch (error) {
            errorCatcher(error);
        }
    };

    async function deleteProduct(id) {
        // console.log(id);
        try {
            const { content } = await productService.delete(id);
            // console.log(content);
            if (content === null) {
                setProducts((prevState) =>
                    prevState.filter((p) => p._id !== id)
                );
            }
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

    return (
        <ProductContext.Provider
            value={{
                products,
                getProductById,
                updateProduct,
                deleteProduct
            }}
        >
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
