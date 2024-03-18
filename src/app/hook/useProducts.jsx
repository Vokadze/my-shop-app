import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import productService from "../service/product.service";
// import httpService from "../service/http.service";
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
    // const prevState = useRef();

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

    // const updateProduct = async ({ _id: id, data }) => {
    //     try {
    //         const { content } = await productService.put(id, data);
    //         // history.push("/admin");
    //         setProducts((prevState) =>
    //             prevState.map((item) => {
    //                 if (item._id === content.id) {
    //                     return content;
    //                 }
    //                 return item;
    //             })
    //         );
    //         return content;
    //     } catch (error) {
    //         // console.log("Expected Error");
    //         errorCatcher(error);
    //     }
    // };

    const updateProduct = async ({ _id: id, ...data }) => {
        try {
            const { content } = await productService.update(id, data);
            // console.log(content);
            setProducts((prevState) =>
                prevState.map((item) => {
                    if (item._id === content._id) {
                        return content;
                    }
                    return item;
                })
            );
            return content;
        } catch (error) {
            errorCatcher(error);
        }
    };

    const addProduct = async (data) => {
        try {
            const { content } = await productService.createProduct(data);
            setProducts((prevState) => [...prevState, content]);
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
                deleteProduct,
                addProduct
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
