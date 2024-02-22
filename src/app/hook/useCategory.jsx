import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import categoryService from "../service/category.service";

const CategoryContext = React.createContext();

export const useCategories = () => {
    return useContext(CategoryContext);
};

export const CategoryProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    console.log(categories);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        getCategoriesList();
    }, []);

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
        setIsLoading(false);
    }

    function getCategories(id) {
        return categories.find((c) => c.id === id);
    }

    async function getCategoriesList() {
        try {
            const { content } = await categoryService.get();
            setCategories(content);
            setIsLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    return (
        <CategoryContext.Provider
            value={{ isLoading, categories, getCategories }}
        >
            {children}
        </CategoryContext.Provider>
    );
};
CategoryProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

// export default CategoryProvider;
