import React from "react";
import PropTypes from "prop-types";

const ProductPage = ({ prodId }) => {
    return <h1>Product Page: {prodId}</h1>;
};

ProductPage.propTypes = {
    prodId: PropTypes.string.isRequired
};

export default ProductPage;
