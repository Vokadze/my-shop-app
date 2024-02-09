import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams, useHistory } from "react-router-dom";

import api from "../../api";

import TextFieldAdmin from "../common/form/textFieldAdmin";
// import { validator } from "../../utils/validator";
import SelectFieldAdmin from "../common/form/selectFieldAdmin";

const initialState = {
    id: "",
    name: "",
    category: "",
    price: "",
    count: "",
    image: ""
};

const AdminForm = () => {
    const { prodId } = useParams();
    // console.log(prodId);
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(initialState);
    // console.log(data);
    const [categoriesList, setCategoriesList] = useState([]);
    // console.log(categoriesList);
    const [products, setProducts] = useState([]);
    // console.log(products);
    // const [errors, setErrors] = useState({});

    useEffect(() => {
        api.products.getById(prodId).then((data) => setProducts(data));
    }, [prodId]);

    // useEffect(() => {
    //     api.categories.fetchAll().then((data) => setCategories(data));
    //     // api.categories.fetchAll(prodId).then((data) => setCategories(data));
    // }, [prodId]);

    // useEffect(() => {
    //     console.log(categories);
    // }, [categories]);

    const getCategoryById = (id) => {
        for (const categori of categoriesList) {
            if (categori.value === id) {
                return { id: categori.value, name: categori.name };
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // const isValid = validator();
        // if (!isValid) return;
        const { category } = data;
        api.products
            .update(prodId, {
                ...data,
                category: getCategoryById(category)
            })
            .then((data) => history.push(`/admin/${data.id}`));

        console.log({ category: getCategoryById(category), ...data });
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

        // if (data.length === "") {
        //     localStorage.setItem(
        //         "products",
        //         JSON.stringify([...products, { ...data }])
        //     );
        //     console.log(data);
        // }

        // if (data) setIsLoading(false);
        // console.log(data);
    }, [prodId, products]);

    useEffect(() => {
        if (data) setIsLoading(false);
    }, [data]);

    // const validatorConfig = {
    //     id: {
    //         isRequired: { message: "Обязателен для заполнения" }
    //     },
    //     name: {
    //         isRequired: { message: "Обязателено для заполнения" }
    //     },
    //     category: {
    //         isRequired: {
    //             message: "Обязательно выберите категорию"
    //         }
    //     },
    //     image: {
    //         isRequired: { message: "Фото обязателено" }
    //     }
    // };

    // useEffect(() => {
    //     validate();
    // }, [data]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    // const validate = () => {
    //     const formErrors = validator(data);

    //     setErrors(formErrors);
    //     return Object.keys(errors).length === 0;
    // };

    // const isValid = Object.keys().length === 0;

    return (
        <>
            {!isLoading && Object.keys(categoriesList).length > 0 ? (
                <form onSubmit={handleSubmit}>
                    <TextFieldAdmin
                        name="id"
                        value={data.id || data.value}
                        onChange={handleChange}
                    />
                    <TextFieldAdmin
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                    />
                    <SelectFieldAdmin
                        defaultOption="categories"
                        name="category"
                        value={data.category}
                        options={categoriesList}
                        onChange={handleChange}
                    />
                    <TextFieldAdmin
                        name="price"
                        value={data.price}
                        onChange={handleChange}
                    />
                    <TextFieldAdmin
                        name="count"
                        value={data.count}
                        onChange={handleChange}
                    />
                    <TextFieldAdmin
                        name="image"
                        value={data.image}
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        // disabled={!isValid}
                        className="btn btn-primary w-100 mx-auto mt-5"
                    >
                        Add/Edit
                    </button>
                </form>
            ) : (
                "Loading AdminForm.jsx"
            )}
        </>
    );
};

AdminForm.propTypes = {
    products: PropTypes.array
};

export default AdminForm;
