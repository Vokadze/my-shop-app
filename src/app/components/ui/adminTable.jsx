import React from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import Table from "../common/table/tableAdmin";

const AdminTable = ({
    products,
    categories,
    handleDelete,
    selectedSort,
    onSort
}) => {
    console.log("adminTable.jsx products", products);
    console.log("AdminTable", categories);
    const history = useHistory();

    const handleClick = () => {
        history.push(history.location.pathname + "/edit");
    };

    const columns = {
        id: {
            path: "id",
            name: "№",
            component: (product) => (
                <span
                    className="badge text-dark w-100 text-center border border-warning p-2"
                    style={{ background: "#dee2e6" }}
                >
                    {product.id}
                </span>
            )
        },
        name: {
            path: "name",
            name: "Наименование",
            component: (product) => (
                <span
                    className="badge text-dark w-100 text-start border border-warning p-2"
                    style={{ background: "#dee2e6" }}
                >
                    {product.name}
                </span>
            )
        },
        category: {
            path: "product.category.name",
            name: "Категория",
            component: (product) => (
                <span
                    className="badge text-dark w-100 text-center border border-warning p-2"
                    style={{ background: "#dee2e6" }}
                >
                    {product.category?.name}
                </span>
            )
        },
        count: {
            path: "count",
            name: "Количество",
            component: (product) => (
                <span
                    className="badge text-dark w-100 text-center border border-warning p-2"
                    style={{ background: "#dee2e6" }}
                >
                    {product.count}
                </span>
            )
        },
        price: {
            path: "price",
            name: "Стоимость",
            component: (product) => (
                <span
                    className="badge text-dark w-100 text-center border border-warning p-2"
                    style={{ background: "#dee2e6" }}
                >
                    {product.price}
                </span>
            )
        },
        url: {
            path: "image",
            name: "Фото",
            component: (product) => (
                <span
                    className="badge text-dark w-100 text-center border border-warning p-2"
                    style={{ background: "#dee2e6" }}
                >
                    <Link to={product.image} role="button">
                        url
                    </Link>
                </span>
            )
        },
        actions: {
            path: "id",
            name: "Действия",
            component: (product) => (
                <span
                    className="badge text-dark w-100 text-start border border-warning p-2"
                    style={{ background: "#dee2e6" }}
                >
                    <Link
                        to={`/admin/${product.id}`}
                        onClick={() => handleClick()}
                    >
                        <i
                            className="bi bi-pencil m-2"
                            style={{
                                background: "#dee2e6",
                                color: "#ffc107"
                            }}
                        ></i>
                    </Link>
                    <span>
                        <i
                            className="bi bi-x-circle-fill m-2"
                            style={{
                                color: "#ffc107"
                            }}
                            role="button"
                            onClick={() => handleDelete(product.id)}
                        ></i>
                    </span>
                </span>
            )
        }
    };

    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={products}
        />
    );
};

AdminTable.propTypes = {
    products: PropTypes.array,
    categories: PropTypes.object,
    handleDelete: PropTypes.func,
    selectedSort: PropTypes.object.isRequired,
    onSort: PropTypes.func
};

export default AdminTable;
