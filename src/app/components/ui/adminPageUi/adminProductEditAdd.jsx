import React from "react";
import { useParams, useHistory } from "react-router-dom";
import AdminFormEdit from "./adminFormEdit";
import { useProduct } from "../../../hook/useProducts";
import httpService from "../../../service/http.service";
import { useCategories } from "../../../hook/useCategory";

const AdminProductEditAdd = () => {
    const history = useHistory();
    const { prodId } = useParams();
    // const id = prodId;
    const productEndPoint = `product/${prodId}`;
    const { getProductById } = useProduct();
    const product = getProductById(prodId);
    console.log(product);
    const { categories } = useCategories();

    const categoriesList = categories.map((c) => ({
        name: c.name,
        value: c.id
    }));

    const updateProduct = async (content) => {
        try {
            const { data } = await httpService.put(productEndPoint, content);
            history.push("/admin");
            return data.content;
        } catch (error) {
            console.log("Expected Error");
        }
    };

    const handleSubmit = (data) => {
        console.log(data);
        updateProduct(data);
        history.push("/admin");
    };

    return (
        <>
            <AdminFormEdit
                key={prodId}
                data={product}
                categoriesList={categoriesList}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default AdminProductEditAdd;
