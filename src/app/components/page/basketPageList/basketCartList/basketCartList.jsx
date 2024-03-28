import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AiOutlineClose } from "react-icons/ai";
import BasketCartListCounter from "../../../ui/basketPageUi/basketCartListCounter";

const BasketCartList = ({ product, productsItems, handleDelete }) => {
    const [countProduct, setCountProduct] = useState();

    useEffect(() => {
        setCountProduct();
    }, [countProduct]);

    const handleIncrement = () => {
        if (product.countPay >= 1) {
            const newLocalPay = productsItems.filter(
                (product) => product.count === product.count--
            );
            localStorage.setItem("productsItems", JSON.stringify(newLocalPay));
        }
        setCountProduct(product.countPay++);
    };

    const handleDecrement = () => {
        if (product.countPay <= 1) {
            const newLocalPay = productsItems.filter(
                (product) => product.count === product.count++
            );
            localStorage.setItem("productsItems", JSON.stringify(newLocalPay));
        }
        setCountProduct(product.countPay--);
    };

    return (
        <>
            <div
                key={product._id}
                className="card border border-warning w-100 d-flex flex-row mb-3"
                style={{ background: "#dee2e6" }}
            >
                <div className="card-img-left m-3">
                    <img
                        src={product.image}
                        className="img-thumbnail border border-warning rounded mx-auto d-block"
                        alt="image"
                        width="100"
                    />
                </div>
                <div className="card-body mx-3">
                    <div className="row">
                        <div className="cart-id">
                            <p className="mt-2">{`id товара: ${product.prodNum}`}</p>
                        </div>
                        <div className="d-flex flex-row">
                            <div className="col col-6">
                                <p className="mt-0 w-300">{`Наименование товара: ${product.name}`}</p>
                            </div>
                            <div className="col mx-3 text-center">
                                <p className="mt-0">Количество:</p>
                                <div className="d-flex flex-row justify-content-center">
                                    <BasketCartListCounter
                                        handleDecrement={handleDecrement}
                                        handleIncrement={handleIncrement}
                                        product={product}
                                    />
                                </div>
                            </div>
                            <div className="col mx-3">
                                <p className="mt-0">Стоимость:</p>
                                <span>{product.price}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <span className="card-image-right m-2 p-2">
                    <div
                        onClick={() => handleDelete(product._id)}
                        role="button"
                    >
                        <AiOutlineClose
                            size={25}
                            style={{
                                background: "#ffc107",
                                borderRadius: 25
                            }}
                        />
                    </div>
                </span>
            </div>
        </>
    );
};

BasketCartList.propTypes = {
    product: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    productsItems: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    handleDelete: PropTypes.func
};

export default BasketCartList;
