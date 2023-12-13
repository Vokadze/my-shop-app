import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import NavBar from "../components/ui/navBar";
import BasketCartList from "../components/page/basket/basketCartList";

const BasketHeader = () => {
    const [productLocal, setProductLocal] = useState();
    console.log("basketHeader.jsx productLocal useState", productLocal);
    const newProductsItem = localStorage.getItem("productsItems");
    const productsItems = JSON.parse(newProductsItem);
    console.log(productsItems);

    useEffect(() => {
        console.log(productsItems);
    }, []);

    const handleDelete = (prodId) => {
        console.log("click");
        if (productsItems) {
            const newLocal = productsItems.filter(
                (product) => product.id !== prodId
            );
            localStorage.setItem("productsItems", JSON.stringify(newLocal));
            setProductLocal(newLocal);
        }
    };

    return (
        <div className="d-flex justify-content-center">
            <div className="d-flex flex-column">
                <NavBar countCartItems={productsItems.length} />
                {/* <div> */}
                <h1>Корзина</h1>
                <BasketCartList
                    productsItems={productsItems}
                    handleDelete={handleDelete}
                />
            </div>
        </div>
    );
};

BasketHeader.propTypes = {
    onAddProduct: PropTypes.func,
    onRemoveProduct: PropTypes.func
    // handleClick: PropTypes.func
};

export default BasketHeader;
