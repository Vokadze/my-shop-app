import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import Basket from "./basket";
// import Basket from "./basket";

const BasketHeader = ({ productsItems }) => {
    // const { countCartItems } = props;
    return (
        <div className="row center block">
            {/* <div>
        <a href="#/">
            <h2>Корзина покупок</h2>
        </a>
    </div> */}
            <div>
                <h1>Basket</h1>
                <div>
                    <Link to="#/cart">
                        Cart
                        {productsItems ? (
                            <button className="badge bg-primary">
                                {productsItems}
                            </button>
                        ) : (
                            ""
                        )}
                    </Link>
                </div>
                {/* <div> */}
                {/* {productsItems.length === 0 && <div>Корзина пуста</div>}
                <Basket productsItems={productsItems} itemsPrice={itemsPrice} /> */}
                {/* </div> */}
                {/* <Basket
                    product={product}
                    productsItems={productsItems}
                    onAddProduct={onAddProduct}
                    onRemoveProduct={onRemoveProduct}
                    itemsPrice={i}
                /> */}
                {/* <button
                    type="button"
                    className="btn btn-primary position-relative"
                > */}
                {/* Cart: */}
                {/* <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {countProductsItems ? (
                            <span className="badge">{countProductsItems}</span>
                        ) : (
                            ""
                        )}
                    </span> */}
                {/* <span className="visually-hidden">unread messages</span> */}
                {/* </button> */}
            </div>
        </div>
    );
};

BasketHeader.propTypes = {
    // countCartItems: PropTypes.number
    product: PropTypes.object,
    productsItems: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onAddProduct: PropTypes.func,
    onRemoveProduct: PropTypes.func
    // itemsPrice: PropTypes.func
};

export default BasketHeader;
