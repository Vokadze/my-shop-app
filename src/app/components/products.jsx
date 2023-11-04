import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import api from "../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import ProductsTable from "./productsTable";

import _ from "lodash";

const Products = ({ products: allProducts, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [categories, setCategories] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    const [sortBy, setSortBy] = useState({ iter: "price", order: "asc" });

    const pageSize = 8;

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

    const handleSort = (item) => {
        setSortBy(item);
        console.log(item);
    };

    const filteredProducts = selectedCategory
        ? allProducts.filter(
              (product) =>
                  JSON.stringify(product.category) ===
                  JSON.stringify(selectedCategory)
          )
        : allProducts;

    const count = filteredProducts.length;

    const sortedProducts = _.orderBy(
        filteredProducts,
        [sortBy.iter],
        [sortBy.order]
    );

    const productCrop = paginate(sortedProducts, currentPage, pageSize);
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
                    <ProductsTable
                        products={productCrop}
                        onSort={handleSort}
                        selectedSort={sortBy}
                        {...rest}
                    />
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
