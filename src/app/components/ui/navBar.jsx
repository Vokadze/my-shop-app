import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { BiCartAlt } from "react-icons/bi";
import { useAuth } from "../../hook/useAuth";
// import NavProfile from "./navProfile";
// d-flex flex-row border border-warning justify-content-center mb-2
const NavBar = ({ countCartItems }) => {
    const { currentUser } = useAuth();
    return (
        <nav className="navbar">
            <div
                className="container-fluid border border-warning"
                style={{ background: "#dee2e6" }}
            >
                {/* <div className="container-fluid"> */}
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/">
                            Main
                        </Link>
                    </li>
                    {currentUser && (
                        <div className="d-flex flex-row justify-content-center mb-2">
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
                                    aria-current="page"
                                    to="/admin"
                                >
                                    Admin
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link text-center"
                                    href="#/cart"
                                    aria-current="page"
                                    to="/basket"
                                >
                                    <div className="position-relative">
                                        <BiCartAlt
                                            size={25}
                                            className="cart-icon"
                                        />
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
                        </div>
                    )}
                </ul>
                <div className="d-flex">
                    {!currentUser ? (
                        <Link to="/products" className="dropdown-item">
                            Вход
                        </Link>
                    ) : (
                        <Link
                            className="nav-link"
                            aria-current="page"
                            to="/logout"
                        >
                            Выход
                        </Link>
                    )}
                </div>
            </div>
            {/* </div> */}
        </nav>
    );
};

NavBar.propTypes = {
    countCartItems: PropTypes.number
};

export default NavBar;
