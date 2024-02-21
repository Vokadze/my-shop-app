import PropTypes from "prop-types";
import React, { useCategories } from "../../hook/useCategory";

const Category = ({ id }) => {
    console.log(id);
    const { isLoading, getCategories } = useCategories();
    const categor = getCategories(id);
    console.log("categor.name", categor.name);

    if (!isLoading) {
        return <p>{categor.name}</p>;
    } else return "loading";
};

Category.propTypes = {
    id: PropTypes.string
};

export default Category;
