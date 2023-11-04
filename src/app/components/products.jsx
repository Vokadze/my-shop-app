import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import Product from "./product";
import api from "../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";

const Products = ({ products: allProducts, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [categories, setCategories] = useState();
    const [selectedCategory, setSelectedCategory] = useState();

    const pageSize = 3;

    useEffect(() => {
        api.categories.fetchAll().then((data) => setCategories(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory]);

    const handleCategoriesSelect = (item) => {
        setSelectedCategory(item);
        console.log(item);
    };
    console.log(categories);

    const handlePageChange = (pageIndex) => {
        console.log("page: ", pageIndex);
        setCurrentPage(pageIndex);
    };

    const filteredProducts = selectedCategory
        ? allProducts.filter(
              (product) =>
                  JSON.stringify(product.category) ===
                  JSON.stringify(selectedCategory)
          )
        : allProducts;

    const count = filteredProducts.length;

    const productCrop = paginate(filteredProducts, currentPage, pageSize);
    console.log(productCrop);

    const clearFilter = () => {
        setSelectedCategory();
    };

    return (
        <>
            <SearchStatus length={count} />
            <div className="d-flex">
                {categories && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedCategory}
                            items={categories}
                            onItemSelect={handleCategoriesSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}

                <div className="d-flex flex-column">
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th colSpan="3" className="text-center">
                                    First
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {productCrop.map((product) => (
                                <Product
                                    key={product.id}
                                    {...rest}
                                    {...product}
                                />
                            ))}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

Products.propTypes = {
    products: PropTypes.array.isRequired
};

export default Products;
