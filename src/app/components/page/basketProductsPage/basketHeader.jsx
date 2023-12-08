import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BasketHeader = ({ countCartItems }) => {
    // const { countCartItems } = props;
    return (
        <div className="row center block">
            {/* <div>
        <a href="#/">
            <h2>Корзина покупок</h2>
        </a>
    </div> */}
            <div>
                <div>
                    <Link to="#/cart">
                        Cart
                        {countCartItems ? (
                            <button className="badge bg-primary">
                                {countCartItems}
                            </button>
                        ) : (
                            ""
                        )}
                    </Link>
                </div>
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
    countCartItems: PropTypes.number.isRequired
};

export default BasketHeader;
