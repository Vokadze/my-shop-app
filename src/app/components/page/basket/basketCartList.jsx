import React from "react";
import PropTypes from "prop-types";

const BasketCartList = ({ productsItems, handleDelete }) => {
    console.log("BasketCartList.jsx", productsItems);

    const itemPrice = productsItems.reduce((a, c) => a + c.qty * c.price, 0);

    return (
        <div className="container">
            <div className="d-flex flex-row">
                <div className="d-flex flex-column">
                    {productsItems.length === 0 && <div>Корзина пуста</div>}
                    {productsItems.map((product) => (
                        <div
                            key={product.id}
                            className="d-flex flex-row justify-content-between"
                        >
                            <div className="d-flex flex-row">
                                <div className="text-center justify-content-between m-3">
                                    <img
                                        src={product.image}
                                        className="rounded mx-auto d-block"
                                        alt=""
                                        width="60"
                                    />
                                </div>
                                <div className="row align-items-start">
                                    <div className="d-flex flex-column">
                                        <div className="cart-id">
                                            <p className="mt-2">{`id товара: ${product.id}`}</p>
                                        </div>
                                        <div className="d-flex flex-row">
                                            <div className="col">
                                                <p className="mt-2">{`Наименование товара: ${product.name}`}</p>
                                            </div>
                                            <div className="col">
                                                <p className="mt-2">{`Количество:  ${product.count}`}</p>
                                            </div>
                                            <div className="col">
                                                <p className="mt-2">{`Стоимость: ${product.price}`}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        aria-label="Close"
                                        onClick={() => handleDelete(product.id)}
                                    ></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {productsItems.length !== 0 && (
                <>
                    <hr />
                    <div className="row">
                        <div>Итого:</div>
                        <div>${itemPrice.toFixed(2)}</div>
                    </div>
                </>
            )}
        </div>
    );
};

BasketCartList.propTypes = {
    productsItems: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    handleDelete: PropTypes.func
};

export default BasketCartList;
