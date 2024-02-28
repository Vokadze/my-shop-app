import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import api from "../api";

const useForm = (data, onSubmit) => {
    const { prodId } = useParams();
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(true);
    const [form, setForm] = useState(
        data || {
            id: "",
            name: "",
            category: "",
            price: "",
            count: "",
            image: ""
        }
    );
    const [categoriesList, setCategoriesList] = useState({});

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const isValid = validate();
        // if (!isValid) return;

        const { category } = form;
        api.products
            .update(prodId, {
                ...form,
                category: getCategoryById(category)
            })
            .then((data) => history.push(`/admin/edit/${data.id}`));

        console.log({ category: getCategoryById(category), ...form });
        console.log(form);
    };

    useEffect(() => {
        setIsLoading(true);
        api.products.getById(prodId).then((category, ...data) => {
            setForm((prevState) => ({
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

        console.log(form);
    }, [prodId, products]);

    useEffect(() => {
        if (form && isLoading) setIsLoading(false);
    }, [form]);

    const handleChange = (target) => {
        setForm((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));

        console.log(target.name);
    };

    return { handleChange, form, handleSubmit, categoriesList };
};

useForm.propTypes = {
    data: PropTypes.array,
    onSubmit: PropTypes.func
};

export default useForm;
