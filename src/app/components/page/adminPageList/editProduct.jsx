import React from "react";
import { useParams } from "react-router-dom";
import AdminFormEdit from "../../ui/adminPageUi/adminFormEdit";
import { useProduct } from "../../../hook/useProducts";

const EditProduct = () => {
    // const history = useHistory()
    const { prodId } = useParams();
    console.log(prodId);
    const { getProductById } = useProduct();
    const product = getProductById(prodId);
    console.log(product);

    return <AdminFormEdit data={product} />;
};

export default EditProduct;
