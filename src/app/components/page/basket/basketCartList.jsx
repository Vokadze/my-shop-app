import React from "react";
import PropTypes from "prop-types";

const BasketCartList = ({ productsItems, handleDelete }) => {
    console.log("BasketCartList.jsx", productsItems);

    const itemPrice = productsItems.reduce((a, c) => a + c.qty * c.price, 0);

    return (
        // <div className="container">
        <div className="d-flex flex-row justify-content-center">
            <div className="d-flex flex-column align-center">
                {productsItems.length === 0 && <div>Корзина пуста</div>}
                {productsItems.map((product) => (
                    <div
                        key={product.id}
                        className="d-flex flex-row justify-content-between border border-warning p-3 rounded mb-3 w-60"
                    >
                        <div className="d-flex flex-row">
                            <div className="text-center justify-content-between m-3">
                                <img
                                    src={product.image}
                                    className="rounded mx-auto d-block"
                                    alt="image"
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
                                            <p className="mt-0">{`Наименование товара: ${product.name}`}</p>
                                        </div>
                                        <div className="col">
                                            <p className="mt-0">Количество:</p>
                                            <div>
                                                <button className="btn btn-sm btn-light">
                                                    -
                                                </button>
                                                <span className="badge bg-primary mx-2">
                                                    {product.qty}
                                                </span>
                                                <button className="btn btn-sm btn-light">
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <p className="mt-0">Стоимость:</p>
                                            <span>{product.price}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 mx-2">
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
            <div className="d-flex flex-column justify-content-center cart-total border border-warning mx-2">
                {productsItems.length !== 0 && (
                    <div className="mx-3">
                        {/* <div className="row"> */}
                        <div className="mb-3">Итого:</div>
                        <div>Итоговая сумма:</div>
                        <div className="mb-5">${itemPrice.toFixed(2)}</div>
                        {/* </div> */}
                        <button className="btn btn-sm text-nowrap btn-warning">
                            Оформить заказ
                        </button>
                    </div>
                )}
            </div>
        </div>
        // </div>
    );
};

BasketCartList.propTypes = {
    productsItems: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    handleDelete: PropTypes.func
};

export default BasketCartList;
