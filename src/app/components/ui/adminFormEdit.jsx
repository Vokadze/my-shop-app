import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import api from "../../api";

import TextFieldAdmin from "../common/form/textFieldAdmin";
import SelectFieldAdmin from "../common/form/selectFieldAdmin";

const AdminFormEdit = () => {
    const { prodId } = useParams();
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({
        id: "",
        name: "",
        category: "",
        price: "",
        count: "",
        image: ""
    });

    const [categoriesList, setCategoriesList] = useState([]);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.products.getById(prodId).then((data) => setProducts(data));
    }, []);

    const getCategoryById = (id) => {
        for (const categori of categoriesList) {
            if (categori.value === id) {
                return { id: categori.value, name: categori.name };
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { category } = data;
        api.products
            .update(prodId, {
                ...data,
                category: getCategoryById(category)
            })
            .then((data) => history.push(`/admin/${data.id}`));

        console.log({ category: getCategoryById(category), ...data });
        console.log(data);
    };

    useEffect(() => {
        setIsLoading(true);
        api.products.getById(prodId).then((category, ...data) => {
            setData((prevState) => ({
                ...prevState,
                ...data,
                ...category
            }));
        });

        api.categories.fetchAll().then((data) => {
            const categoryList = Object.keys(data).map((categoryName) => ({
                name: data[categoryName].name,
                value: data[categoryName].id
            }));
            setCategoriesList(categoryList);
        });

        console.log(data);
    }, [prodId, products]);

    useEffect(() => {
        if (data && isLoading) setIsLoading(false);
    }, [data]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));

        console.log(target.name);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextFieldAdmin
                name="id"
                value={data.id || ""}
                onChange={handleChange}
            />
            <TextFieldAdmin
                name="name"
                value={data.name || ""}
                onChange={handleChange}
            />
            <SelectFieldAdmin
                defaultOption="Choose..."
                name="categor"
                options={categoriesList || ""}
                onChange={handleChange}
                value={data.category}
            />
            <TextFieldAdmin
                name="price"
                value={data.price || ""}
                onChange={handleChange}
            />
            <TextFieldAdmin
                name="count"
                value={data.count || ""}
                onChange={handleChange}
            />
            <TextFieldAdmin
                name="image"
                value={data.image || ""}
                onChange={handleChange}
            />
            <button
                type="submit"
                // disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Edit
            </button>
        </form>
    );
};

export default AdminFormEdit;
