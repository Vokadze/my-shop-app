import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import api from "../../../api";

const AddAdminPage = ({ prodId }) => {
    console.log(prodId);
    // const history = useHistory();
    const [product, setProduct] = useState();

    useEffect(() => {
        api.products.getById(prodId).then((data) => setProduct(data));
    }, []);

    // const handleClick = () => {
    //         history.push(history.location.pathname + "/edit");
    //     }
    //     return history.push("/admin");
    // };

    if (product) {
        return (
            <>
                <h6>id: {product.id}</h6>
                <h6>Наименование: {product.name}</h6>
                <h6>Категория: {product.category.name}</h6>
                <h6>Количество: {product.count}</h6>
                <h6>Цена: {product.price}</h6>
                <h6>url фото: {product.image}</h6>
                <button className="btn btn-primary" onClick={handleClick}>
                    Изменить
                </button>
            </>
        );
    } else {
        return "loading AddAdminPage.jsx";
    }
};

AddAdminPage.propTypes = {
    prodId: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.object.isRequired
    ])
    // handleClick: PropTypes.func
};

export default AddAdminPage;
