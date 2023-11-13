import React from "react";
import PropTypes from "prop-types";

const Product = ({ id, image, name, price, handleClick }) => {
    return (
        <tr key={id}>
            <td className="align-center">
                <img
                    src={image}
                    alt=""
                    className="rounded mx-auto d-block"
                    width="130"
                    height="160"
                />
            </td>
            <td className="align-center p-4" width="auto">
                <div>
                    <p>Наименование товара: {name}</p>
                    <p>id товара: {id}</p>
                    <p>Стоимость: {price}</p>
                </div>
            </td>
            <td>
                <button
                    className="btn btn-primary btn-sm text-nowrap mb-4"
                    type="button"
                    onClick={() => handleClick(id)}
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
    handleClick: PropTypes.func
};

export default Product;
