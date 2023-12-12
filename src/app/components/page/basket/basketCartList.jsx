import React from "react";
import PropTypes from "prop-types";

const BasketCartList = ({ productsItems, onRemoveProduct }) => {
    console.log("BasketCartList.jsx", productsItems);

    const itemPrice = productsItems.reduce((a, c) => a + c.qty * c.price, 0);

    const onAddProduct = (product) => {
        console.log("add");
    };

    return (
        <>
            {productsItems.length === 0 && <div>Корзина пуста</div>}
            {productsItems.map((product) => (
                // <h1 key={product.id}>name: {product.name}</h1>
                <div key={product.id} className="card d-flex flex-row mb-2">
                    <div className="text-center align-center m-3">
                        <img
                            src={product.image}
                            className="rounded mx-auto d-block"
                            alt=""
                            width="60"
                        />
                    </div>
                    <div className="d-flex flex-column justify-content-start mx-4 w-100">
                        <p className="mt-2">{`id товара: ${product.id}`}</p>
                        <div className="d-flex flex-row">
                            <p className="mt-2">{`Наименование товара: ${product.name}`}</p>
                            <p className="mt-2">{`Количество:  ${product.count}`}</p>
                            <p className="mt-2">{`Стоимость: ${product.price}`}</p>
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={() => onRemoveProduct(product)}
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
                        <div>Итого:</div>
                        <div>${itemPrice.toFixed(2)}</div>
                    </div>
                </>
            )}
        </>
    );
};

BasketCartList.propTypes = {
    productsItems: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    // onAddProduct: PropTypes.func,
    onRemoveProduct: PropTypes.func
};

export default BasketCartList;
