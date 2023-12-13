import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const NavBar = ({ countCartItems }) => {
    return (
        <div className="d-flex flex-row border border-warning justify-content-center mb-2">
            <ul className="nav">
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/">
                        Main
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/login">
                        Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        aria-current="page"
                        to="/products"
                    >
                        Products
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        href="#/cart"
                        aria-current="page"
                        to="/basketHeader"
                    >
                        Корзина
                        {countCartItems ? (
                            <button className="badge bg-primary">
                                {countCartItems}
                            </button>
                        ) : (
                            ""
                        )}
                    </Link>
                </li>
            </ul>
        </div>
    );
};

NavBar.propTypes = {
    countCartItems: PropTypes.number
};

export default NavBar;
