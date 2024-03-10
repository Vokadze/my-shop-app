import React from "react";
import PropTypes from "prop-types";

const BasketShopList = ({ product, onAddProduct }) => {
    if (product) {
        return (
            <div className="d-flex flex-row justify-content-center">
                <div className="row cols-row-1 cols-row-md-3 g-0">
                    <div className="col">
                        <div
                            className="card border border-warning w-100 d-flex flex-row mb-3"
                            style={{ background: "#dee2e6" }}
                        >
                            <div className="card-img-left m-3">
                                <img
                                    src={product.image}
                                    className="img-thumbnail border border-warning rounded mx-auto d-block"
                                    alt=""
                                    width="150"
                                />
                            </div>
                            <div className="card-body mx-3">
                                <p className="mt-2">{`Наименование товара: ${product.name}`}</p>
                                <p className="mt-2">{`Стоимость: ${product.price}`}</p>
                            </div>
                            <div className="card-image-right p-2">
                                <div>
                                    <button
                                        className="btn btn-primary btn-lg text-nowrap w-100 mt-5"
                                        style={{
                                            background: "#ffc107",
                                            color: "#212529",
                                            border: "#ffc107"
                                        }}
                                        onClick={() => onAddProduct(product)}
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
        );
    } else {
        return "loading basketShopList.jsx";
    }
};

BasketShopList.propTypes = {
    product: PropTypes.object,
    onAddProduct: PropTypes.func,
    onRemoveProduct: PropTypes.func,
    item: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default BasketShopList;
