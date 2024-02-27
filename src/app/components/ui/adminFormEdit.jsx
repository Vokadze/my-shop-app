import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams, useHistory } from "react-router-dom";

// import api from "../../api";

import TextFieldAdmin from "../common/form/textFieldAdmin";
import SelectFieldAdmin from "../common/form/selectFieldAdmin";
import { useAuth } from "../../hook/useAuth";
import { useCategories } from "../../hook/useCategory";
import { useProduct } from "../../hook/useProducts";

// const initialState = {
//     id: "",
//     name: "",
//     category: "",
//     price: "",
//     count: "",
//     image: ""
// };
const AdminFormEdit = () => {
    const { prodId } = useParams();
    // console.log(prodId);
    const history = useHistory();

    const { products, getProductById } = useProduct();
    console.log(products);
    const product = getProductById(prodId);
    console.log(product);

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    // {
    //     id: "",
    //     name: "",
    //     category: "",
    //     price: "",
    //     count: "",
    //     image: ""
    // }

    const { updateProductData } = useAuth();
    const { categories, isLoading: categoriesLoading } = useCategories();
    const categoriesList = categories.map((c) => ({
        name: c.name,
        value: c.id
    }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const isValid = validate();
        // if (!isValid) return;
        // const { category } = data;
        await updateProductData({
            ...data
        });

        history.push("/admin");
        console.log(data);
    };

    useEffect(() => {
        if (!categoriesLoading && product && !data) {
            // setData(...data);
            setData(...product);
        } else if (!categoriesLoading && product && data) {
            // setData(...data);
            setData(...product);
        }
        console.log(data);
    }, [categoriesLoading, product, data]);

    console.log([categoriesLoading, product, data]);

    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data, product]);

    // useEffect(() => {
    //     if (data === "") setIsLoading(false);
    // }, [data]);

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
    if (product) {
        return (
            <>
                {!isLoading && Object.keys(categories).length > 0 ? (
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
                            // label="Выберите категорию товара"
                            defaultOption="Choose..."
                            name="categor"
                            options={categoriesList || ""}
                            onChange={handleChange}
                            value={data.categor}
                            // error={errors.category}
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
                ) : (
                    "Loading AdminFormEdit.jsx"
                )}
            </>
        );
    } else {
        return "loading adminFormEdit.jsx update....";
    }
};

AdminFormEdit.propTypes = {
    prodId: PropTypes.number
};

export default AdminFormEdit;
