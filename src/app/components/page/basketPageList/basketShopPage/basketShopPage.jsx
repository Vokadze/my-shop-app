import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import SearchInput from "../../../common/form/searchInput";
import NavBar from "../../../ui/navBar";
import BasketShopList from "../basketShopList/basketShopList";
import { useSelector } from "react-redux";
import { getProductById } from "../../../../store/products";
import history from "../../../../utils/history";

const BasketShopPage = ({ prodId }) => {
    const [productsItems, setProductItems] = useState([]);

    const product = useSelector(getProductById(prodId));

    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchQuery = ({ target }) => {
        setSearchQuery(target.value);
    };

    const onAddProduct = (product) => {
        const exist = productsItems.find((p) => p._id === product._id);
        if (exist) {
            const newCartProducts = productsItems.map((p) =>
                p._id === product._id
                    ? {
                          ...exist,
                          count: exist.count - 1
                      }
                    : p
            );
            setProductItems(newCartProducts);
            localStorage.setItem(
                "productsItems",
                JSON.stringify(newCartProducts)
            );
        } else {
            const newCartProducts = [
                ...productsItems,
                {
                    ...product,
                    qty: 1,
                    countPay: 1
                }
            ];
            setProductItems(newCartProducts);
            localStorage.setItem(
                "productsItems",
                JSON.stringify(newCartProducts)
            );
        }
        history.push(`/basket`);
    };

    const onRemoveProduct = (product) => {
        const exist = productsItems.find((p) => p._id === product._id);
        if (exist.qty === 1) {
            const newCartProducts = productsItems.filter(
                (p) => p._id !== product._id
            );
            setProductItems(newCartProducts);
        } else {
            const newCartProducts = productsItems.map((p) =>
                p._id === product._id ? { ...exist, count: exist.count + 1 } : p
            );
            setProductItems(newCartProducts);
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
            <div className="d-flex flex-column">
                <NavBar countCartItems={productsItems.length} />
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
                    style={{ background: "#dee2e6" }}
                />

                <BasketShopList
                    product={product}
                    item={productsItems.find((p) => p._id === product._id)}
                    onAddProduct={onAddProduct}
                    onRemoveProduct={onRemoveProduct}
                />
            </div>
        );
    } else {
        return "loading BasketShopPage.jsx";
    }
};

BasketShopPage.propTypes = {
    prodId: PropTypes.string
};

export default BasketShopPage;
