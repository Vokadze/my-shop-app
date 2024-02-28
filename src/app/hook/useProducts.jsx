import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import productService from "../service/product.service";
// import { useAuth } from "./useAuth";

const ProductContext = React.createContext();

export const useProduct = () => {
    return useContext(ProductContext);
};

const ProductProvider = ({ children }) => {
    // console.log(children);
    const [products, setProducts] = useState([]);
    // const { currentUser } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    // console.log(products);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        try {
            const { content } = await productService.get();
            // console.log(content);
            setProducts(content);
            setIsLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    // useEffect(() => {
    //     if (!isLoading) {
    //         const indexProduct = products.findIndex(
    //             (p) => p.id !== currentUser.id
    //         );
    //         console.log(indexProduct);
    //     }
    //     // return product;
    // }, [currentUser]);

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

    function getProductById(prodId) {
        return products.filter((p) => p.id === prodId);
    }

    async function removeProduct(prodId) {
        // console.log(prodId);
        try {
            const { content } = await productService.removeProduct(prodId);
            // console.log(content);
            if (content === null) {
                setProducts((prevState) =>
                    prevState.filter((p) => p.id !== prodId)
                );
            }
        } catch (error) {
            errorCatcher(error);
        }
        // setProducts(content)
        // setIsLoading(false)
        // console(prodId);
        // return products.filter((p)=>p.id!==prodId)
    }

    return (
        <ProductContext.Provider
            value={{ products, getProductById, removeProduct }}
        >
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
