import React from "react";
import PropTypes from "prop-types";
// import Product from "./product";
// import TableBody from "./tableBody";
// import TableHeader from "./tableHeader";
import Table from "./table";
import { Link } from "react-router-dom";

const ProductsTable = ({
    products,
    product,
    onSort,
    selectedSort,
    handleClick,
    ...rest
}) => {
    const columns = {
        name: { path: "price", name: "Функция сортировка (по стоимости)" }
    };
    const columnsInfo = {
        image: {
            component: (product) => (
                <div className="text-center w-100 align-center">
                    <img
                        src={product.image}
                        className="rounded mx-auto d-block"
                        alt=""
                        width="100"
                    />
                </div>
            )
        },
        info: {
            path: "name",
            component: (product) => (
                <div className="d-flex flex-column justify-content-start m-0">
                    <p className="mt-2">{`Наименование товара: ${product.name}`}</p>
                    <p className="mt-2">{`id товара:  ${product.id}`}</p>
                    <p className="mt-2">{`Стоимость: ${product.price}`}</p>
                </div>
            )
        },
        button: {
            component: (product) => (
                <Link to={`/products/${product.id}`}>
                    <button
                        className="btn btn-primary btn-sm text-nowrap"
                        type="button"
                        onClick={() => handleClick(product.id)}
                    >
                        Открыть карточку
                    </button>
                </Link>
            )
        }
    };
    return (
        // <Table className="table table-borderless">
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={products}
            columnsInfo={columnsInfo}
        >
            {/* <TableHeader {...{ onSort, selectedSort, columns }} />
            <TableBody {...{ data: products }} columns={columnsInfo} /> */}
        </Table>
        // {/* <tbody>
        //         {products.map((product) => (
        //             <Product key={product.id} {...rest} {...product} />
        //         ))}
        //     </tbody> */}
        // </table>
    );
};

ProductsTable.propTypes = {
    products: PropTypes.array.isRequired,
    product: PropTypes.array,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    handleClick: PropTypes.func.isRequired
};

export default ProductsTable;
