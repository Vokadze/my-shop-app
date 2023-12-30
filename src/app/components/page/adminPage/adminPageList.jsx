import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AdminPageList = ({ products, product, handleDelete }) => {
    return (
        <tr key={`${products[product].id}`}>
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
                <Link to={products[product].image} role="button">
                    url
                </Link>
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
                                handleDelete(`${products[product].id}`)
                            }
                        ></i>
                    </span>
                </div>
            </td>
        </tr>
    );
};

AdminPageList.propTypes = {
    products: PropTypes.array,
    product: PropTypes.string,
    handleDelete: PropTypes.func
};

export default AdminPageList;
