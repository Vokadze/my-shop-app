import React from "react";
import PropTypes from "prop-types";
// import api from "../../../api";
// import { useHistory } from "react-router-dom";
// import SearchInput from "../../ui/searchInput";
// import NavBar from "../../ui/navBar";

const BasketList = ({ product, onAddProduct, onRemoveProduct, item }) => {
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
                                    {item ? (
                                        <div className="d-flex flex-row">
                                            <button
                                                onClick={() =>
                                                    onRemoveProduct(item)
                                                }
                                                className="remove"
                                            >
                                                -
                                            </button>
                                            <span className="px-3">
                                                {item.qty}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    onAddProduct(item)
                                                }
                                                className="add"
                                            >
                                                +
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <button
                                                className="btn btn-primary btn-lg text-nowrap w-100 mb-5"
                                                // type="button"
                                                onClick={() =>
                                                    onAddProduct(product)
                                                }
                                                // onClick={() =>
                                                //     handleClick(item)
                                                // }
                                            >
                                                Купить!!!!
                                            </button>
                                        </div>
                                    )}

                                    {/* <div>
                                        <button
                                            className="btn btn-primary btn-lg text-nowrap w-100 mb-5"
                                            // type="button"
                                            onClick={() => onAddProduct(item)}
                                        >
                                            Купить
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            className="btn btn-primary btn-lg text-nowrap w-100 mb-5"
                                            // type="button"
                                            onClick={() =>
                                                onRemoveProduct(item)
                                            }
                                        >
                                            Отменить
                                        </button>
                                    </div> */}

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
        return "loading productPage.jsx";
    }
};

BasketList.propTypes = {
    product: PropTypes.object,
    // prodId: PropTypes.string.isRequired,
    onAddProduct: PropTypes.func,
    onRemoveProduct: PropTypes.func,
    item: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default BasketList;
