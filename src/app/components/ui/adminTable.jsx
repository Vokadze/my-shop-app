import React from "react";
import PropTypes from "prop-types";
// import "./index.css";
// import AdminPageList from "./adminPageList";
// import AdminHeader from "./adminHeader";
// import AdminBody from "./adminBody";
import { Link } from "react-router-dom";
import Table from "../common/table/tableAdmin";
// import AdminTable from "../../common/table/tableAdmin/table";

const AdminTable = ({
    products,
    categories,
    handleDelete,
    selectedSort,
    onSort
}) => {
    console.log("adminTable.jsx products", products);
    console.log("AdminTable", categories);

    const columns = {
        id: {
            path: "product.id",
            name: "№",
            component: (products) => <span>{`${products.id}`}</span>
        },
        name: {
            path: "product.name",
            name: "Наименование",
            component: (product) => <span>{`${product.name}`}</span>
        },
        categories: {
            path: "product.category.name",
            name: "Категория",
            component: (product) => <span>{`${product.category.name}`}</span>
        },
        count: {
            path: "product.count",
            name: "Количество",
            component: (product) => <span>{`${product.count}`}</span>
        },
        price: {
            path: "product.price",
            name: "Стоимость",
            component: (product) => <span>{`${product.price}`}</span>
        },
        url: {
            path: "product.image",
            name: "Фото",
            component: (product) => (
                <span>
                    <Link to={`${product.image}`} role="button">
                        url
                    </Link>
                </span>
            )
        },
        actions: {
            path: "product.id",
            name: "Действия",
            component: (product) => (
                <span className="button-admin">
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
