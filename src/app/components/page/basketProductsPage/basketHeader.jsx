import React, { useEffect } from "react";
import PropTypes from "prop-types";
import NavBar from "../../ui/navBar";

const BasketHeader = ({ onAddProduct, onRemoveProduct }) => {
    const newProductsItem = localStorage.getItem("productsItems");
    const productsItems = JSON.parse(newProductsItem);
    console.log(productsItems);

    useEffect(() => {
        console.log(productsItems);
    }, []);

    const itemPrice = productsItems.reduce((a, c) => a + c.qty * c.price, 0);

    return (
        <div className="row center block">
            {/* <div>
        <a href="#/">
            <h2>Корзина покупок</h2>
        </a>
    </div> */}
            <div>
                <NavBar countCartItems={productsItems.length} />
                <h1>Basket Header</h1>
                {productsItems.length === 0 && <div>Корзина пуста</div>}
                {productsItems.map((product) => (
                    <div key={product.id} className="card d-flex flex-row mb-2">
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
                            <p className="mt-2">{`Количество:  ${product.count}`}</p>
                            <p className="mt-2">{`Стоимость: ${product.price}`}</p>
                        </div>
                        <div>
                            <button
                                onClick={() => onRemoveProduct(product.id)}
                                className="remove"
                            >
                                -
                            </button>
                            <button
                                onClick={() => onAddProduct(product)}
                                className="add"
                            >
                                +
                            </button>
                        </div>
                        <div>
                            {product.qty} x ${product.price.toFixed(2)}
                        </div>
                    </div>
                ))}
                {productsItems.length !== 0 && (
                    <>
                        <hr />
                        <div className="row">
                            <div>Итого</div>
                            <div>${itemPrice.toFixed(2)}</div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

BasketHeader.propTypes = {
    onAddProduct: PropTypes.func,
    onRemoveProduct: PropTypes.func
};

export default BasketHeader;
