import React from "react";
import { useParams } from "react-router-dom";
import AdminProductEdit from "./adminProductEdit";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../store/categories";
import {
    getProductById,
    getProductUpdateContent
} from "../../../store/products";

const AdminProduct = () => {
    const dispatch = useDispatch();
    const { prodId } = useParams();

    const nanoId = nanoid();
    console.log("nanoId", nanoId);

    const product = useSelector(getProductById(prodId));
    console.log(product);

    const categories = useSelector(getCategories());

    const categoriesList = categories.map((c) => ({
        name: c.name,
        value: c._id
    }));

    const handleSubmit = (data) => {
        console.log(data);
        dispatch(getProductUpdateContent({ _id: nanoId, ...data }));
    };

    return (
        <>
            <AdminProductEdit
                prodId={prodId}
                nanoId={nanoId}
                product={product}
                categoriesList={categoriesList}
                onSubmit={handleSubmit}
            />
        </>
    );
};

// AdminProduct.propTypes = {
//     // onSubmit: PropTypes.func
//     nanoId: PropTypes.string
// };

export default AdminProduct;
