import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { BiCartAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/users";
import { getUserId } from "../../service/localStorage.service";
import { getBaskets } from "../../store/basket";

const NavBar = () => {
    const userId = getUserId();
    console.log(userId);

    const isLoggedIn = useSelector(getIsLoggedIn());

    const countCartItems = useSelector(getBaskets(userId));

    return (
        <nav className="navbar">
            <div
                className="container-fluid border border-warning"
                style={{ background: "#dee2e6" }}
            >
                {/* <div className="container-fluid"> */}
                <ul className="nav">
                    <li className="nav-item">
                        <Link
                            className="nav-link mb-2 mt-2"
                            aria-current="page"
                            to="/"
                        >
                            Main
                        </Link>
                    </li>
                    {isLoggedIn && (
                        <div className="d-flex flex-row justify-content-center mb-2 mt-2">
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
                                    to={`/admin/${userId}`}
                                >
                                    Admin
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link text-center"
                                    href="#/cart"
                                    aria-current="page"
                                    to={`/basket/${userId}`}
                                >
                                    <div className="position-relative">
                                        <BiCartAlt
                                            size={25}
                                            className="cart-icon"
                                        />
                                        {countCartItems ? (
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                {countCartItems.length}
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
                    {!isLoggedIn ? (
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
    countCartItems: PropTypes.number,
    userId: PropTypes.string
};

export default NavBar;
