import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Table, { TableBody, TableHeader } from "../common/table/tableAdmin";

const AdminTable = ({
    products,
    categories,
    handleDelete,
    handleClick,
    selectedSort,
    onSort,
    prodId
}) => {
    console.log("adminTable.jsx products", products);
    console.log("AdminTable", categories);

    const columns = {
        id: {
            path: "id",
            name: "№"
        },
        name: {
            path: "name",
            name: "Наименование"
            // component: (product) => (
            //     <span
            //         className="text-dark w-100 text-start"
            //         style={{ background: "#dee2e6" }}
            //     >
            //         {product.name}
            //     </span>
            // )
        },
        category: {
            path: "category.name",
            name: "Категория"
        },
        count: {
            path: "count",
            name: "Количество"
        },
        price: {
            path: "price",
            name: "Стоимость"
        },
        url: {
            name: "Фото",
            component: (product) => (
                <span>
                    <Link to={product.image} role="button">
                        url
                    </Link>
                </span>
            )
        },
        actions: {
            // path: "id",
            name: "Действия",
            component: (product) => (
                <span>
                    <Link
                        to={`/admin/${product.id}/edit`}
                        onClick={handleClick}
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
        <>
            <Table
                onSort={onSort}
                selectedSort={selectedSort}
                columns={columns}
                data={products}
            >
                <TableHeader {...{ onSort, selectedSort, columns }} />
                <TableBody {...{ data: products }} columns={columns} />
            </Table>
        </>
    );
};

AdminTable.propTypes = {
    products: PropTypes.array,
    categories: PropTypes.object,
    handleDelete: PropTypes.func,
    handleClick: PropTypes.func,
    selectedSort: PropTypes.object.isRequired,
    onSort: PropTypes.func,
    prodId: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.object.isRequired
    ])
};

export default AdminTable;
