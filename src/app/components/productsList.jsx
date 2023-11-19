import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import api from "../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import ProductsTable from "./productsTable";

import _ from "lodash";

const ProductsList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [categories, setCategories] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    const [sortBy, setSortBy] = useState({ iter: "price", order: "asc" });
    const pageSize = 4;

    const [products, setProducts] = useState();
    console.log("products App.jsx", products);

    useEffect(() => {
        api.products.fetchAll().then((data) => setProducts(data));
    }, []);

    const handleClick = (prodId) => {
        setProducts(products.filter((product) => product.id === prodId));
    };

    useEffect(() => {
        api.categories.fetchAll().then((data) => setCategories(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, products]);

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

    if (products) {
        const filteredProducts = selectedCategory
            ? products.filter(
                  (product) =>
                      JSON.stringify(product.category) ===
                      JSON.stringify(selectedCategory)
              )
            : products;

        const count = filteredProducts.length;

        const sortedProducts = _.orderBy(
            filteredProducts,
            [sortBy.path],
            [sortBy.order]
        );

        const productCrop = paginate(sortedProducts, currentPage, pageSize);
        console.log(productCrop);

        const clearFilter = () => {
            setSelectedCategory();
        };

        return (
            <div className="container">
                <h1>Проверка связи</h1>
                <SearchStatus length={count} />
                <SearchStatus length={products.length} />
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
                    {/* <div className="container"> */}
                    <div className="d-flex flex-column flex-shrink-0">
                        <ProductsTable
                            products={productCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            handleClick={handleClick}
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
                {/* </div> */}
            </div>
        );
    }
    return "Loading productsList.jsx";
};

ProductsList.propTypes = {
    products: PropTypes.array
};

export default ProductsList;
