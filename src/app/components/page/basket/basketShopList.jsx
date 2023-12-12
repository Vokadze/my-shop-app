import React from "react";
import PropTypes from "prop-types";

const BasketShopList = ({ product, onAddProduct, onRemoveProduct, item }) => {
    if (product) {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 offset-md-0 shadow p-4">
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
                                <div className="d-flex flex-column justify-content-center mx-3">
                                    <div>
                                        <button
                                            className="btn btn-primary btn-lg text-nowrap w-100 mb-5"
                                            // type="button"
                                            onClick={() =>
                                                onAddProduct(product)
                                            }
                                        >
                                            Купить!!!!
                                        </button>
                                    </div>

                                    <div className="text-end">
                                        <p className="mt-5 mb-1 text-end">{`id товара:  ${product.id}`}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return "loading basketShopList.jsx";
    }
};

BasketShopList.propTypes = {
    product: PropTypes.object,
    // prodId: PropTypes.string.isRequired,
    onAddProduct: PropTypes.func,
    onRemoveProduct: PropTypes.func,
    item: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default BasketShopList;
