import React, { useEffect, useState } from "react";
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
        categor: "",
        price: "",
        count: "",
        image: ""
    });
    console.log(data);
    const [categories, setCategories] = useState({});
    console.log(categories);
    // const [errors, setErrors] = useState({});

    useEffect(() => {
        api.categories.fetchAll().then((data) => setCategories(data));
        api.categories.fetchAll(prodId).then((data) => setCategories(data));
    }, []);

    // useEffect(() => {
    //     console.log(categories);
    // }, [categories]);

    const getCategoryById = (id) => {
        for (const categ of categories) {
            if (categ.value === id) {
                return { id: categ.value, name: categ.name };
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
        console.log({ ...data, category: getCategoryById(category) });
        console.log(data);
    };

    useEffect(() => {
        setIsLoading(true);
        if (prodId) {
            api.products.getById(prodId).then(({ categor, ...data }) => {
                setData((prevState) => ({
                    ...prevState,
                    ...data,
                    category: categories.id
                }));
            });
        } else {
            api.products.getById(prodId).then((...data) => {
                setData((prevState) => ({
                    ...prevState,
                    ...data
                }));
            });
        }
        api.categories.fetchAll().then((data) => {
            const categoryList = Object.keys(data).map((categoryName) => ({
                name: data[categoryName].name,
                value: data[categoryName].id
            }));
            setCategories(categoryList);
        });
        console.log(data);
    }, []);

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
                        name="categor"
                        options={categories}
                        onChange={handleChange}
                        value={data.categor?.id}
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

export default AdminForm;
