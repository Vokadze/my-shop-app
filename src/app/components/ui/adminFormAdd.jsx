import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// import api from "../../api";

import { validator } from "../../utils/validator";
import TextFieldAdmin from "../common/form/textFieldAdmin";
import SelectFieldAdmin from "../common/form/selectFieldAdmin";
import { useAuth } from "../../hook/useAuth";
import { useCategories } from "../../hook/useCategory";
import { useProduct } from "../../hook/useProducts";

const AdminFormAdd = () => {
    // const { prodId } = useParams();
    // const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    // {
    //     id: "",
    //     name: "",
    //     category: "",
    //     price: "",
    //     count: "",
    //     image: ""
    //     // categor: "",
    //     // sex: "male",
    //     // licence: false
    // }
    const { currentUser } = useAuth();
    const { categories, isLoading: categoriesLoading } = useCategories();
    // const [categories, setCategories] = useState([]);
    // const [products, setProducts] = useState({});
    const [errors, setErrors] = useState({});

    const { products } = useProduct();
    console.log(products);

    // useEffect(() => {
    //     api.products.fetchAll().then((data) => setProducts(data));
    // }, []);

    // useEffect(() => {
    //     api.categories.fetchAll().then((data) => setCategories(data));
    // }, []);

    // useEffect(() => {
    //     console.log(categories);
    // }, [categories]);

    // const getCategoryById = (id) => {
    //     for (const categori of categories) {
    //         if (categori.value === id) {
    //             return { id: categori.value, name: categori.name };
    //         }
    //     }
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        // const { category } = data;
        // api.products.update({
        //     ...data,
        //     category: getCategoryById(category)
        // });
        // .then((data) => history.push(`/admin/${data.id}`));

        localStorage.setItem(
            "products",
            JSON.stringify([...products, { ...data }])
        );

        // console.log({ category: getCategoryById(category), ...data });
        console.log(data);
    };

    useEffect(() => {
        if (!categoriesLoading && currentUser && !data) {
            setData({
                ...currentUser
            });
        }
        // setIsLoading(true);
        // api.products.getById().then((...data) => {
        //     setData((prevState) => ({
        //         ...prevState,
        //         ...data
        //         // ...category
        //     }));
        // });

        // api.categories.fetchAll().then((data) => {
        //     const categoryList = Object.keys(data).map((categoryName) => ({
        //         name: data[categoryName].name,
        //         value: data[categoryName].id
        //     }));
        //     setCategories(categoryList);
        // });
    }, [categoriesLoading, currentUser, data]);

    console.log([categoriesLoading, currentUser, data]);
    console.log(data);

    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);

    // useEffect(() => {
    //     if (data) setIsLoading(false);
    // }, [data]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));

        console.log(target.name);
    };

    const validatorConfig = {
        // id: {
        //     isRequired: { message: "Введите порядковый номер продукта" }
        // },
        // name: {
        //     isRequired: { message: "Введите название продукта" }
        // },
        category: {
            isRequired: {
                message: "Выберите категорию товара"
            }
        }
        // price: {
        //     isRequired: { message: "Введите стоимость продукта" }
        // },
        // count: {
        //     isRequired: { message: "Введите количество продукта" }
        // },
        // image: {
        //     isRequired: { message: "Введите url продукта" }
        // }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    return (
        <>
            {!isLoading && Object.keys(categories).length > 0 ? (
                <form onSubmit={handleSubmit}>
                    <TextFieldAdmin
                        // label="Электронная почта"
                        name="id"
                        onChange={handleChange}
                        value={data.id}
                        // error={errors.id}
                    />
                    <TextFieldAdmin
                        name="name"
                        onChange={handleChange}
                        value={data.name}
                        // error={errors.name}
                    />
                    <SelectFieldAdmin
                        // label="Выберите категорию товара"
                        defaultOption="Choose..."
                        name="category"
                        options={categories}
                        onChange={handleChange}
                        value={data.category}
                        error={errors.category}
                    />
                    <TextFieldAdmin
                        name="price"
                        onChange={handleChange}
                        value={data.price}
                        // error={errors.price}
                    />
                    <TextFieldAdmin
                        name="count"
                        onChange={handleChange}
                        value={data.count}
                        // error={errors.count}
                    />
                    <TextFieldAdmin
                        name="image"
                        onChange={handleChange}
                        value={data.image}
                        // error={errors.image}
                    />

                    <button
                        type="submit"
                        disabled={!isValid}
                        className="btn btn-primary w-100 mx-auto mt-3"
                    >
                        Add
                    </button>
                </form>
            ) : (
                "Loading AdminFormAdd.jsx"
            )}
        </>
    );
};

export default AdminFormAdd;
