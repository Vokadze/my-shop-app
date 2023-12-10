import React from "react";
import PropTypes from "prop-types";

const CartListItem = ({ onAddProduct, onRemoveProduct, productsItems }) => {
    // const { image, name, id, price, count } = product;
    const itemsPrice = () => {
        return productsItems.reduce((a, c) => a + c.qty * c.price, 0);
    };
    return (
        <>
            <h1>Cart List Item</h1>
            <div>
                {productsItems.length === 0 && <div>Корзина пуста</div>}
                {productsItems.map((product) => (
                    <div
                        key={product.id}
                        className="col-md-12 offset-md-0 shadow p-4"
                    >
                        <div className="d-flex flex-row">
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
                                <p className="mt-2">{`Стоимость: ${product.price}`}</p>
                            </div>
                            <div className="d-flex flex-column justify-content-end mx-3">
                                <div>
                                    <button
                                        className="btn btn-primary btn-lg text-nowrap w-100 mb-5"
                                        onClick={() => onAddProduct(product.id)}
                                    >
                                        +
                                    </button>
                                    <span className="cart-list-item__count">
                                        {product.count}
                                    </span>
                                    <button
                                        className="btn btn-primary btn-lg text-nowrap w-100 mb-5"
                                        onClick={() =>
                                            onRemoveProduct(product.id)
                                        }
                                    >
                                        -
                                    </button>
                                </div>
                                <div className="text-end">
                                    <p className="mt-5 mb-1 text-end">{`id товара:  ${product.id}`}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {productsItems.length !== 0 && (
                    <>
                        <hr />
                        <div className="row">
                            <div>Итого</div>
                            <div>${itemsPrice().toFixed(2)}</div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

CartListItem.propTypes = {
    productsItems: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onAddProduct: PropTypes.func,
    onRemoveProduct: PropTypes.func
    // image: PropTypes.string.isRequired,
    // name: PropTypes.string.isRequired,
    // id: PropTypes.number.isRequired,
    // price: PropTypes.number.isRequired,
    // count: PropTypes.number.isRequired
};

export default CartListItem;
