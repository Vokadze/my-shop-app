import React from "react";
import PropTypes from "prop-types";

const Product = ({ id, image, name, price, handleChange }) => {
    return (
        <tr key={id}>
            <td className="mx-auto w-25">
                <img
                    src={image}
                    alt=""
                    className="rounded mx-auto d-block mx-auto"
                    width="130"
                    height="160"
                />
            </td>
            <td className="align-center p-4 w-50" width="auto">
                <p>Наименование товара: {name}</p>
                <p>id товара: {id}</p>
                <p>Стоимость: {price}</p>
            </td>
            <td className="align-bottom">
                <button
                    className="btn btn-primary btn-sm text-nowrap mb-4"
                    type="button"
                    onClick={() => handleChange(id)}
                >
                    Открыть карточку
                </button>
            </td>
        </tr>
    );
};

Product.propTypes = {
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    handleChange: PropTypes.func
};

export default Product;
