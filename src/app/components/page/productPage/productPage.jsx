import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import { useHistory } from "react-router-dom";
import SearchInput from "../../ui/searchInput";
import NavBar from "../../ui/navBar";
import BasketShopList from "../basketProductsPage/basketShopList";
// import Basket from "../basketProductsPage/basket";

const ProductPage = ({ prodId }) => {
    const history = useHistory();
    const [productsItems, setProductItems] = useState([]);
    console.log("productPage.jsx useState productsItem", productsItems);

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
        history.push(`/products/${product.id}/edit`);
    };

    const onRemoveProduct = (product) => {
        const exist = productsItems.find((p) => p.id === product.id);
        if (exist.qty === 1) {
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
                        />

                        <BasketShopList
                            // key={product.id}
                            product={product}
                            item={productsItems.find(
                                (p) => p.id === product.id
                            )}
                            // productsItems={productsItems}
                            onAddProduct={onAddProduct}
                            onRemoveProduct={onRemoveProduct}
                        />
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
