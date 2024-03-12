import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

// import api from "../api";
import { useCategories } from "./useCategory";
import { useProduct } from "./useProducts";
// import productService from "../service/product.service";

const useForm = (onSubmit) => {
    const { prodId } = useParams();
    // const history = useHistory();

    const [isLoading, setIsLoading] = useState(true);
    const [form, setForm] = useState(
        {} || {
            id: "",
            name: "",
            category: "",
            price: "",
            count: "",
            image: ""
        }
    );
    // const [categoriesList, setCategoriesList] = useState([]);
    const { categories, isLoading: categoriesLoading } = useCategories();
    // console.log(categoriesList);
    const categoriesList = categories.map((c) => ({
        name: c.name,
        value: c.id
    }));
    // console.log(categoriesListMap);

    // const [products, setProducts] = useState([]);
    const { products, getProductById, updateProduct } = useProduct();
    console.log(products);
    const product = getProductById(prodId);
    console.log({ product });

    // useEffect(() => {
    //     getProductById();
    //     // api.products.getById(prodId).then((data) => setProducts(data));
    // }, [prodId]);

    const getCategoryById = (id) => {
        for (const category of categories) {
            if (category.value === id) {
                return { id: category.value, name: category.name };
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const isValid = validate();
        // if (!isValid) return;

        const { category } = form;
        await updateProduct(prodId, {
            ...form,
            ...product,
            category: getCategoryById(category)
        });
        // .then((data) => history.push(`/admin/edit/${data.id}`));
        // history.push(`/admin/edit/${data._id}`);

        console.log({ category: getCategoryById(category), ...form });
        // console.log(data);
    };

    useEffect(() => {
        if (!categoriesLoading && product && form) {
            setForm({ ...form, ...product });
        }
        // setIsLoading(true);
        // api.products.getById(prodId).then((category, ...data) => {
        //     setForm((prevState) => ({
        //         ...prevState,
        //         ...data,
        //         ...category
        //     }));
        // });

        // api.categories.fetchAll().then((data) => {
        //     const categoryList = Object.keys(data).map((categoryName) => ({
        //         name: data[categoryName].name,
        //         value: data[categoryName].id
        //     }));
        //     setCategoriesList(categoryList);
        // });

        console.log(form);
    }, [categoriesLoading, product, !form]);

    console.log([categoriesLoading, product, form]);

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
    // data: PropTypes.array,
    onSubmit: PropTypes.func
};

export default useForm;
