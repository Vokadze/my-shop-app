import React from "react";
// import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { AiOutlineClose } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { HiMinus } from "react-icons/hi";

const BasketCartList = ({ productsItems, handleDelete }) => {
    console.log("BasketCartList.jsx", productsItems);
    // const history = useHistory();

    const itemPrice = productsItems.reduce((a, c) => a + c.qty * c.price, 0);

    const handleClick = () => {
        console.log("click");
        // history.push("/orderPage");
    };

    return (
        <div className="d-flex flex-row">
            <div className="row cols-row-1 cols-row-md-3 g-0">
                <div className="col">
                    {productsItems.length === 0 && <div>Корзина пуста</div>}
                    {productsItems.map((product) => (
                        <div
                            key={product.id}
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
                                        <p className="mt-2">{`id товара: ${product.id}`}</p>
                                    </div>
                                    <div className="d-flex flex-row">
                                        <div className="col col-6">
                                            <p className="mt-0 w-300">{`Наименование товара: ${product.name}`}</p>
                                        </div>
                                        <div className="col mx-3 text-center">
                                            <p className="mt-0">Количество:</p>
                                            <div className="d-flex flex-row justify-content-center">
                                                <div role="button">
                                                    <HiMinus
                                                        size={20}
                                                        style={{
                                                            background:
                                                                "#ffc107",
                                                            borderRadius: 25
                                                        }}
                                                    />
                                                </div>
                                                <span className="badge bg-primary mx-2">
                                                    {product.qty}
                                                </span>
                                                <div role="button">
                                                    <FaPlus
                                                        size={20}
                                                        style={{
                                                            background:
                                                                "#ffc107",
                                                            borderRadius: 25
                                                        }}
                                                    />
                                                </div>
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
                                    onClick={() => handleDelete(product.id)}
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
                    ))}
                </div>
            </div>
            <div className="col">
                <div
                    className="card border border-warning mx-3"
                    style={{ background: "#dee2e6" }}
                >
                    {productsItems.length !== 0 && (
                        <div className="cart-body mb-3">
                            <div className="mx-3">
                                <div className="mb-3 mt-4">Итого:</div>
                                <div>Итоговая сумма:</div>
                                <div className="mb-5">
                                    ${itemPrice.toFixed(2)}
                                </div>
                                <div className="text-center">
                                    <button
                                        className="btn btn-sm text-nowrap btn-warning"
                                        onClick={handleClick}
                                    >
                                        Оформить заказ
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

BasketCartList.propTypes = {
    productsItems: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    handleDelete: PropTypes.func
};

export default BasketCartList;
