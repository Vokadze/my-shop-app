import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { BiCartAlt } from "react-icons/bi";

const NavBar = ({ countCartItems }) => {
    return (
        <div
            className="d-flex flex-row border border-warning justify-content-center mb-2"
            style={{ background: "#dee2e6" }}
        >
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
                {/* <li className="nav-item">
                    <Link
                        className="nav-link"
                        aria-current="page"
                        to="/adminPage0"
                    >
                        Admin0
                    </Link>
                </li> */}
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        aria-current="page"
                        to="/adminPage"
                    >
                        Admin
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        className="nav-link text-center"
                        href="#/cart"
                        aria-current="page"
                        to="/basketHeader"
                    >
                        <div className="position-relative">
                            <BiCartAlt size={25} className="cart-icon" />
                            {countCartItems ? (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {countCartItems}
                                </span>
                            ) : (
                                ""
                            )}
                        </div>
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
