import React from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "../../../hook/useProducts";
import { useCategories } from "../../../hook/useCategory";
import AdminProductEdit from "./adminProductEdit";
import { nanoid } from "nanoid";

const AdminProduct = () => {
    const { prodId } = useParams();

    const nanoId = nanoid();
    console.log("nanoId", nanoId);

    const { getProductById } = useProduct();
    const { updateProduct } = useProduct();
    const product = getProductById(prodId);
    console.log(product);
    const { categories } = useCategories();

    const categoriesList = categories.map((c) => ({
        name: c.name,
        value: c.id
    }));

    const handleSubmit = (data) => {
        console.log(data);
        updateProduct({ _id: nanoId, ...data });
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
