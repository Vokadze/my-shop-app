import PropTypes from "prop-types";
import React, { useCategories } from "../../../hook/useCategory";

const Category = ({ id }) => {
    const { isLoading, getCategories } = useCategories();
    const category = getCategories(id);

    if (!isLoading) {
        return <p className="m-0">{category.name}</p>;
    } else return "loading";
};

Category.propTypes = {
    id: PropTypes.string
};

export default Category;
