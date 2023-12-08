import React from "react";
import PropTypes from "prop-types";

const Basket = ({ productsItems, onAddProduct, onRemoveProduct }) => {
    const itemsPrice = productsItems.reduce((a, c) => a + c.qty * c.price, 0);
    console.log("basket", itemsPrice);

    return (
        <div className="d-flex flex-column">
            <h1>Basket</h1>
            <div>
                {productsItems.length === 0 && <div>Корзина пуста</div>}
                {productsItems.map((product) => (
                    <div key={product.id} className="card d-flex flex-row mb-2">
                        <div className="text-center align-center m-3">
                            <img
                                src={product.image}
                                className="rounded mx-auto d-block"
                                alt=""
                                width="150"
                            />
                        </div>
                        <div className="d-flex flex-column justify-content-start mx-4 w-100">
                            <p className="mt-2">{`Наименование товара: ${product.name}`}</p>
                            <p className="mt-2">{`Количество:  ${product.count}`}</p>
                            <p className="mt-2">{`Стоимость: ${product.price}`}</p>
                        </div>
                        <div>
                            <button
                                onClick={() => onRemoveProduct(product)}
                                className="remove"
                            >
                                -
                            </button>
                            <button
                                onClick={() => onAddProduct(product)}
                                className="add"
                            >
                                +
                            </button>
                        </div>
                        <div>
                            {product.qty} x ${product.price.toFixed(2)}
                        </div>
                    </div>
                ))}
                {productsItems.length !== 0 && (
                    <>
                        <hr />
                        <div className="row">
                            <div>Итого</div>
                            <div>${itemsPrice.toFixed(2)}</div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
    // } else {
    //     return "loading basket.jsx";
    // }
};

Basket.propTypes = {
    productsItems: PropTypes.array.isRequired,
    onAddProduct: PropTypes.func,
    onRemoveProduct: PropTypes.func
};

export default Basket;
