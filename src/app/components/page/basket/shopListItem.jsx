import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api";
// import { useHistory } from "react-router-dom";
// import NavBar from "../../ui/navBar";

const ShopListItem = () => {
    const { prodId } = useParams();
    // const history = useHistory();
    const [product, setProduct] = useState();
    console.log("ShopListItem.jsx", product);

    useEffect(() => {
        api.products.getById(prodId).then((data) => setProduct(data));
    }, []);

    if (product) {
        return (
            <div>
                <div className="col-md-12 offset-md-0 shadow p-4">
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
                                <button className="btn btn-primary btn-lg text-nowrap w-100 mb-5">
                                    Купить
                                </button>
                            </div>
                            <div className="text-end">
                                <p className="mt-5 mb-1 text-end">{`id товара:  ${product.id}`}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return "loading ShopListItem.jsx";
    }
};

export default ShopListItem;
