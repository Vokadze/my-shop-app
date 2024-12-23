import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import BasketShopList from "../basketShopList/basketShopList";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../../../store/products";
import history from "../../../../utils/history";
import basketService from "../../../../service/basket.servise";
import { createBasket } from "../../../../store/basket";

const BasketShopPage = ({ prodId }) => {
    console.log(prodId);

    const dispatch = useDispatch();

    const [productsItems, setProductItems] = useState([]);
    console.log(productsItems);

    const product = useSelector(getProductById(prodId));
    console.log(product);

    const basketProduct = basketService.fetchAll(prodId);
    console.log(basketProduct);

    const getItemBasket = basketService.getBasket(prodId, product);
    console.log(getItemBasket);

    const onAddProduct = (product) => {
        console.log(product);
        // const exist = productsItems.find((p) => p._id === product._id);
        // if (exist) {
        //     const newCartProducts = productsItems.map((p) =>
        //         p._id === product._id
        //             ? {
        //                   ...exist,
        //                   count: exist.count - 1
        //               }
        //             : p
        //     );

        //     setProductItems(newCartProducts);
        //     localStorage.setItem(
        //         "productsItems",
        //         JSON.stringify(newCartProducts)
        //     );
        // } else {
        //     const newCartProducts = [
        //         ...productsItems,
        //         {
        //             ...product,
        //             qty: 1,
        //             countPay: 1
        //         }
        //     ];
        //     setProductItems(newCartProducts);
        //     localStorage.setItem(
        //         "productsItems",
        //         JSON.stringify(newCartProducts)
        //     );
        // }
        dispatch(createBasket(product));
        history.push(`/basket`);
    };

    const onRemoveProduct = (product) => {
        console.log("product remove", product);

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
                <input
                    type="text"
                    name="searchQuery"
                    placeholder="Путь к товару"
                    className="mb-4 text-center border border-warning"
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
