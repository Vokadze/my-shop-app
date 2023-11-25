import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import { useHistory } from "react-router-dom";
import SearchInput from "../../ui/searchInput";
import NavBar from "../../ui/navBar";

const ProductPage = ({ prodId }) => {
    const history = useHistory();
    const [product, setProduct] = useState();
    console.log("productPage.jsx", product);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchQuery = ({ target }) => {
        // setSelectedCategory(undefined);
        setSearchQuery(target.value);
    };

    useEffect(() => {
        api.products.getById(prodId).then((data) => setProduct(data));
    }, []);

    const handleClick = () => {
        history.push("/products");
    };

    if (product) {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <NavBar />
                        <SearchInput
                            type="text"
                            name="searchQuery"
                            placeholder="Поисковая строка (по названию)"
                            className="mb-2 text-center"
                            onChange={handleSearchQuery}
                            value={searchQuery}
                        />

                        <input
                            type="text"
                            name="searchQuery"
                            placeholder="Путь к товару"
                            className="mb-4 text-center border"
                            // onChange={handleSearchQuery}
                            // value={searchQuery}
                        />
                        {/* <SearchInput
                            type="text"
                            name="searchQuery"
                            placeholder="Путь к товару"
                            className="mb-2 text-center"
                            onChange={handleSearchQuery}
                            value={searchQuery}
                        /> */}
                        <div className="col-md-12 offset-md-0 shadow p-4">
                            {/* // <div className="container w-100"> */}
                            <div className="d-flex flex-row">
                                {/* // <div className="d-flex flex-row justify-content-start border mb-2"> */}
                                {/* // <div className="d-flex flex-row justify-content-center"> */}
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
                                    {/* <p className="mt-2">{`id товара:  ${product.id}`}</p> */}
                                    <p className="mt-2">{`Стоимость: ${product.price}`}</p>
                                </div>
                                <div className="d-flex flex-column justify-content-end mx-3">
                                    <div>
                                        <button
                                            className="btn btn-primary btn-lg text-nowrap w-100 mb-5"
                                            type="button"
                                            onClick={() =>
                                                handleClick(product.id)
                                            }
                                        >
                                            Все пользователи
                                        </button>
                                    </div>
                                    <div className="text-end">
                                        <p className="mt-5 mb-1 text-end">{`id товара:  ${product.id}`}</p>
                                    </div>
                                </div>
                                {/* </div> */}
                                {/* </div> */}
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

ProductPage.propTypes = {
    prodId: PropTypes.string.isRequired
};

export default ProductPage;
