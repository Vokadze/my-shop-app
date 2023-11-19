import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../api";
import { useHistory } from "react-router-dom";

const ProductPage = ({ prodId }) => {
    const history = useHistory();
    const [product, setProduct] = useState();
    console.log("productPage.jsx", product);

    useEffect(() => {
        api.products.getById(prodId).then((data) => setProduct(data));
    });

    const handleClick = () => {
        history.push("/products");
    };

    if (product) {
        return (
            <div>
                <div className="text-center w-100 align-center">
                    <img
                        src={product.image}
                        className="rounded mx-auto d-block"
                        alt=""
                        width="100"
                    />
                </div>
                <div className="d-flex flex-column justify-content-start m-0">
                    <p className="mt-2">{`Наименование товара: ${product.name}`}</p>
                    <p className="mt-2">{`id товара:  ${product.id}`}</p>
                    <p className="mt-2">{`Стоимость: ${product.price}`}</p>
                </div>
                <div>
                    <button
                        className="btn btn-primary btn-sm text-nowrap"
                        type="button"
                        onClick={() => handleClick(product.id)}
                    >
                        Все пользователи
                    </button>
                </div>
            </div>
        );
    } else {
        return "loading productPage.jsx";
    }
};

ProductPage.propTypes = {
    prodId: PropTypes.string.isRequired
};

export default ProductPage;
