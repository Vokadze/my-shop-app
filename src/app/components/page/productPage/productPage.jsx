import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
// import { useHistory } from "react-router-dom";
import SearchInput from "../../ui/searchInput";
import NavBar from "../../ui/navBar";
import BasketList from "../basketProductsPage/basketList";
import BasketHeader from "../basketProductsPage/basketHeader";
import Basket from "../basketProductsPage/basket";

const ProductPage = ({ prodId }) => {
    // const history = useHistory();
    const [productsItems, setProductItems] = useState([]);
    // console.log("productPage.jsx useState productsItem", productsItems);

    const [product, setProduct] = useState();
    console.log("productPage.jsx useState product", product);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchQuery = ({ target }) => {
        // setSelectedCategory(undefined);
        setSearchQuery(target.value);
    };

    useEffect(() => {
        api.products.getById(prodId).then((data) => setProduct(data));
    }, []);

    const onAddProduct = (product) => {
        const exist = productsItems.find((p) => p.id === product.id);
        if (exist) {
            const newCartProducts = productsItems.map((p) =>
                p.id === product.id ? { ...exist, qty: exist.qty + 1 } : p
            );
            setProductItems(newCartProducts);
            localStorage.setItem(
                "productsItems",
                JSON.stringify(newCartProducts)
            );
        } else {
            const newCartProducts = [...productsItems, { ...product, qty: 1 }];
            setProductItems(newCartProducts);
            localStorage.setItem(
                "productsItems",
                JSON.stringify(newCartProducts)
            );
        }
    };

    const onRemoveProduct = (product) => {
        const exist = productsItems.find((p) => p.id === product.id);
        if (exist === 1) {
            const newCartProducts = productsItems.filter(
                (p) => p.id !== product.id
            );
            setProductItems(newCartProducts);
            localStorage.setItem(
                "productsItems",
                JSON.stringify(newCartProducts)
            );
        } else {
            const newCartProducts = productsItems.map((p) =>
                p.id === product.id ? { ...exist, qty: exist.qty - 1 } : p
            );
            setProductItems(newCartProducts);
            localStorage.setItem(
                "productsItems",
                JSON.stringify(newCartProducts)
            );
        }
    };
    useEffect(() => {
        setProductItems(
            localStorage.getItem("productsItems")
                ? JSON.parse(localStorage.getItem("productsItems"))
                : []
        );
    }, []);

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
                        />
                        <BasketHeader countCartItems={productsItems.length} />
                        {/* <h1>name: {products.name}</h1> */}
                        {/* {Object.keys(product).map((prod) => (
                            <>
                        <h1 key={prod.id}>{prod.name}</h1> */}
                        <Basket
                            key={product.id}
                            product={product}
                            productsItems={productsItems}
                            onAddProduct={onAddProduct}
                            onRemoveProduct={onRemoveProduct}
                        />
                        <BasketList
                            key={product.id}
                            product={product}
                            item={productsItems.find(
                                (p) => p.id === product.id
                            )}
                            // productsItems={productsItems}
                            onAddProduct={onAddProduct}
                            onRemoveProduct={onRemoveProduct}
                        />
                        {/* </>
                        ))} */}

                        {/* <div className="col-md-12 offset-md-0 shadow p-4">
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
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        );
    } else {
        return "loading productPage.jsx";
    }
};

ProductPage.propTypes = {
    prodId: PropTypes.string
};

export default ProductPage;
