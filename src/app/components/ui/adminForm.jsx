import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams, useHistory } from "react-router-dom";

import api from "../../api";

import TextFieldAdmin from "../common/form/textFieldAdmin";
// import { validator } from "../../utils/validator";
import SelectFieldAdmin from "../common/form/selectFieldAdmin";

const AdminForm = () => {
    const { prodId } = useParams();
    console.log(prodId);
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        id: "",
        name: "",
        category: "",
        price: "",
        count: "",
        image: ""
    });
    console.log(data);
    const [categories, setCategories] = useState([]);
    console.log(categories);
    const [products, setProducts] = useState([]);
    console.log(products);
    // const [errors, setErrors] = useState({});

    useEffect(() => {
        api.products.fetchAll().then((data) => setProducts(data));
    }, []);

    useEffect(() => {
        // api.categories.fetchAll().then((data) => setCategories(data));
        api.categories.fetchAll(prodId).then((data) => setCategories(data));
    }, [prodId]);

    // useEffect(() => {
    //     console.log(categories);
    // }, [categories]);

    const getCategoryById = (id) => {
        for (const categ of categories) {
            if (categ.value === id) {
                return { id: categ.value, name: categ.label };
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(e.target.name);
        // const isValid = validator();
        // if (!isValid) return;
        const { category } = data;
        api.products
            .update(prodId, {
                ...data,
                category: getCategoryById(category)
            })
            .then((data) => history.push(`/admin/${data.id}`));

        localStorage.setItem(
            "products",
            JSON.stringify([...products, { ...data }])
        );
        console.log({ ...data, category: getCategoryById(category) });
        console.log(data);
    };

    useEffect(() => {
        setIsLoading(true);
        if (prodId) {
            api.products.getById(prodId).then(({ category, ...data }) => {
                setData((prevState) => ({
                    ...prevState,
                    ...data,
                    category: category.id
                }));
            });
        } else {
            api.products.getById().then((...data) => {
                setData((prevState) => ({
                    ...prevState,
                    ...data
                }));
            });
        }
        // api.categories.fetchAll().then((data)=>setCategories(data))
        api.categories.fetchAll().then((data) => {
            const categoryList = Object.keys(data).map((categoryName) => ({
                name: data[categoryName].name,
                value: data[categoryName].id
            }));
            setCategories(categoryList);
        });
        console.log(data);
    }, [prodId]);

    useEffect(() => {
        if (data) {
            setIsLoading(false);
        } else if (data.id) setIsLoading(false);
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
    //     const formErrors = validator(data, validatorConfig);

    //     setErrors(formErrors);
    //     return Object.keys(errors).length === 0;
    // };

    // const isValid = Object.keys(errors).length === 0;
    // if (!data.length > 0) {
    return (
        <>
            {!isLoading && Object.keys(categories).length > 0 ? (
                <form onSubmit={handleSubmit}>
                    <TextFieldAdmin
                        name="id"
                        value={data.id}
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
                        options={categories}
                        onChange={handleChange}
                        value={data.category}
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
    // } else {
    //     return "Loading AdminForm.jsx";
    // }
};

AdminForm.propTypes = {
    products: PropTypes.array
};

export default AdminForm;
