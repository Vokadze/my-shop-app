import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import api from "../../api";

import TextFieldAdmin from "../common/form/textFieldAdmin";
import SelectFieldAdmin from "../common/form/selectFieldAdmin";

const AdminFormChange = () => {
    const { prodId } = useParams();
    // console.log(prodId);
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
    const [categoriesList, setCategoriesList] = useState([]);
    // const [errors, setErrors] = useState({});
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.products.getById(prodId).then((data) => setProducts(data));
    }, [prodId]);

    const getCategoryById = (id) => {
        for (const categori of categoriesList) {
            if (categori.value === id) {
                return { id: categori.value, name: categori.name };
            }
        }
    };

    // useEffect(() => {
    //     api.categories.fetchAll().then((data) => setCategories(data));
    // }, []);

    // useEffect(() => {
    //     console.log(categories);
    // }, [categories]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // const isValid = validate();
        // if (!isValid) return;
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
    //     email: {
    //         isRequired: {
    //             message: "Электронная почта обязательна для заполнения"
    //         },
    //         isEmail: {
    //             message: "Email введен не корректно"
    //         }
    //     },
    //     password: {
    //         isRequired: { message: "Пароль обязателен для заполнения" },
    //         isCapitalSymbol: {
    //             message: "Пароль должен содержать хотя бы одну заглавную букву"
    //         },
    //         isContainDigit: {
    //             message: "Пароль должен содержать хотя бы одну цифру"
    //         },
    //         min: {
    //             message: "Пароль должен состоять минимум из 8 символов",
    //             value: 8
    //         }
    //     },
    //     categor: {
    //         isRequired: {
    //             message: "Обязательно выберите категорию товара"
    //         }
    //     },
    //     licence: {
    //         isRequired: {
    //             message:
    //                 "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
    //         }
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

        console.log(target.name);
    };

    // const validate = () => {
    //     const errors = validator(data, validatorConfig);

    //     setErrors(errors);
    //     return Object.keys(errors).length === 0;
    // };

    // const isValid = Object.keys(errors).length === 0;

    return (
        <>
            {!isLoading && Object.keys(categoriesList).length > 0 ? (
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
                        // label="Выберите категорию товара"
                        defaultOption="Choose..."
                        name="category"
                        options={categoriesList}
                        onChange={handleChange}
                        value={data.category}
                        // error={errors.category}
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
                        className="btn btn-primary w-100 mx-auto"
                    >
                        Edit
                    </button>
                </form>
            ) : (
                "Loading AdminFormChange.jsx"
            )}
        </>
    );
};

export default AdminFormChange;
