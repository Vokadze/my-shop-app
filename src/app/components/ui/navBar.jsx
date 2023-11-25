import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div className="d-flex flex-row border justify-content-center p-2 mb-4">
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
            </ul>
        </div>
    );
};

export default NavBar;
