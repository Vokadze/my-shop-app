import PropTypes from "prop-types";
import React, { useCategories } from "../../hook/useCategory";

const Category = ({ id }) => {
    // console.log(id);
    const { isLoading, getCategories } = useCategories();
    const categor = getCategories(id);

    if (!isLoading) {
        // console.log("categor.name", categor.name);
        return <p className="m-0">{categor.name}</p>;
    } else return "loading";
    // return null;
};

Category.propTypes = {
    id: PropTypes.string
};

export default Category;
