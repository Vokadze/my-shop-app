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
    const [setErrors] = useState(null);
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
                const { message } = error.response.data;
                setErrors(message);
            }
        };
        getProducts();
    }, []);

    // const getProducts = async () => {
    //     try {
    //         const { data } = await productService.get();
    //         return data;
    //     } catch (error) {
    //         const { message } = error.response.data;
    //         toast.error(message);
    //     }
    // };

    // useEffect(() => {
    //     getProducts().then((data) => setProducts(data));
    // }, []);

    // const updateProduct = async (id, content) => {
    //     try {
    //         const { data } = await productService.update(id, content);
    //         return data.content;
    //     } catch (error) {
    //         const { message } = error.response.data;
    //         toast.error(message);
    //     }
    //     // console.log(data);
    // };

    // async function getProducts() {
    //     try {
    //         const { content } = await productService.get();
    //         // console.log(content);
    //         setProducts(content);
    //         setIsLoading(false);
    //     } catch (error) {
    //         errorCatcher(error);
    //     }
    // }

    function getProductById(id) {
        return products.find((p) => p._id === id);
    }

    const updateProduct = async ({ _id: id, ...data }) => {
        try {
            const { content } = await productService.update(id, data);
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
            const { content } = await productService.create(data);
            setProducts((prevState) => [...prevState, content]);
            return content;
        } catch (error) {
            errorCatcher(error);
        }
    };

    // useEffect(() => {
    //     if (!isLoading) {
    //         const indexProduct = products.findIndex(
    //             (p) => p.id !== currentUser.id
    //         );
    //         console.log(indexProduct);
    //     }
    //     // return product;
    // }, [currentUser]);

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
                removeProduct,
                updateProduct,
                addProduct
            }}
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
