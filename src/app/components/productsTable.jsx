import React from "react";
import PropTypes from "prop-types";
import Product from "./product";
import TableHeader from "./tableHeader";

const ProductsTable = ({ products, onSort, selectedSort, ...rest }) => {
    const columns = {
        price: { iter: "price", name: "Функция сортировка (по стоимости)" }
    };
    return (
        <table className="table table-borderless">
            <TableHeader {...{ onSort, selectedSort, columns }} />
            <tbody>
                {products.map((product) => (
                    <Product key={product.id} {...rest} {...product} />
                ))}
            </tbody>
        </table>
    );
};

ProductsTable.propTypes = {
    products: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
};

export default ProductsTable;
