import React, { useEffect, useState } from "react";
import api from "../../api";

import TextFieldAdmin from "../common/form/textFieldAdmin";
import { validator } from "../../utils/validator";
import SelectFieldAdmin from "../common/form/selectFieldAdmin";

const AddEditForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    const [data, setData] = useState({
        id: "",
        name: "",
        category: "",
        price: "",
        count: "",
        image: ""
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        api.categories.fetchAll().then((data) => setCategories(data));
    }, []);

    useEffect(() => {
        console.log(categories);
    }, [categories]);

    const getCategoryById = (id) => {
        for (const categ of categories) {
            if (categ.value === id) {
                return { id: categ.value, name: categ.name };
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validator();
        if (!isValid) return;
        const { category } = data;
        api.products.update({
            ...data,
            category: getCategoryById(category)
        });
        console.log(data);
    };

    useEffect(() => {
        setIsLoading(true);
        api.products.getById().then((...data) => {
            setData((prevState) => ({
                ...prevState,
                ...data
            }));
        });
        api.categories.fetchAll().then((data) => {
            const categoryList = Object.keys(data).map((categoryName) => ({
                name: data[categoryName].name,
                value: data[categoryName].id
            }));
            setCategories(categoryList);
        });
    }, []);

    useEffect(() => {
        if (data) setIsLoading(false);
    }, [data]);

    const validatorConfig = {
        id: {
            isRequired: { message: "Обязателен для заполнения" }
        },
        name: {
            isRequired: { message: "Обязателено для заполнения" }
        },
        category: {
            isRequired: {
                message: "Обязательно выберите категорию"
            }
        },
        image: {
            isRequired: { message: "Фото обязателено" }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validate = () => {
        const formErrors = validator(data, validatorConfig);

        setErrors(formErrors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

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
                        disabled={!isValid}
                        className="btn btn-primary w-100 mx-auto mt-5"
                    >
                        Add/Edit
                    </button>
                </form>
            ) : (
                "Loading addEditForm.jsx"
            )}
        </>
    );
};

export default AddEditForm;
