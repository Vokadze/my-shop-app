import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./index.css";

const AdminPage0 = ({ products, categories, handleDelete }) => {
    // const [data, setData] = useState();
    // console.log("adminPage0.jsx useState", data);
    console.log("adminPage0.jsx products", products);
    console.log("AdminPage0", categories);

    // const handleDelete = (id) => {
    //     console.log(id);
    //     setData(products.filter((d) => d.id !== id));
    //     // products.filter((prod) => prod.id !== id);
    // };
    // const [categories, setCategories] = useState;

    // useEffect(() => {
    //     api.categories.fetchAll().then((data) => setCategories(data));
    // }, []);

    // const getCategoriesTable = (name) => {
    //     console.log(name);
    //     categories.filter((c) => c.name === name);
    // };

    // const getCategories = (id) => {
    //     for (const categ of categories) {
    //         if (categ.value === id) {
    //             return { id: categ.value, name: categ.name };
    //         }
    //     }
    // };
    // console.log(getCategories());

    // if (data) {
    return (
        <table className="table border-style mx-2">
            <thead className="border border-warning">
                <tr>
                    <th scope="col">№</th>
                    <th scope="col">Наименование</th>
                    <th scope="col">Категория</th>
                    <th scope="col">Кол-во</th>
                    <th scope="col">Стоимость</th>
                    <th scope="col">Фото</th>
                    <th scope="col">Действия</th>
                </tr>
            </thead>
            <tbody className="border-style">
                {Object.keys(products).map((product) => (
                    <tr key={products[product].id}>
                        <td scope="row">{`${products[product].id}`}</td>
                        <td>{`${products[product].name}`}</td>
                        <td>{`${products[product].category.name}`}</td>
                        {/* {Object.keys(categories).map((c) => (
                            <td
                                key={categories[c].id}
                            >{`${categories[c].name}`}</td>
                        ))} */}
                        <td>{`${products[product].count}`}</td>
                        <td>{`${products[product].price}`}</td>
                        <td>
                            <Link to={products[product].image}>url</Link>
                        </td>
                        <td>
                            <div className="button-admin">
                                <span>
                                    <i
                                        className="bi bi-pencil mx-1"
                                        style={{
                                            background: "#dee2e6",
                                            color: "#ffc107"
                                        }}
                                    ></i>
                                </span>
                                <span>
                                    <i
                                        className="bi bi-x-circle-fill mx-1"
                                        style={{
                                            // backgroundColor: "black",
                                            color: "#ffc107"
                                            // borderRadius: 25
                                        }}
                                        onClick={() =>
                                            handleDelete(
                                                `${products[product].id}`
                                            )
                                        }
                                    ></i>
                                </span>
                            </div>
                        </td>
                    </tr>
                ))}
                <tr></tr>
            </tbody>
        </table>
    );
    // }
    // return "loading delete admin products";
};

AdminPage0.propTypes = {
    products: PropTypes.array,
    categories: PropTypes.object,
    handleDelete: PropTypes.func
};

export default AdminPage0;
