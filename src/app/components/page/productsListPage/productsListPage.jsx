import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import api from "../../../api";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import ProductsTable from "../../ui/productsTable";
import SearchInput from "../../ui/searchInput";

import _ from "lodash";
import NavBar from "../../ui/navBar";

const ProductsListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [categories, setCategories] = useState();
    const [searchQuery, setSearchQuery] = useState("");
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
    }, [selectedCategory, searchQuery, products]);

    const handleCategoriesSelect = (item) => {
        if (searchQuery !== "") setSearchQuery("");
        setSelectedCategory(item);
        console.log(item);
    };
    console.log(categories);

    const handleSearchQuery = ({ target }) => {
        setSelectedCategory(undefined);
        setSearchQuery(target.value);
    };

    const handlePageChange = (pageIndex) => {
        console.log("page: ", pageIndex);
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
        console.log(item);
    };

    if (products) {
        const filteredProducts = searchQuery
            ? products.filter(
                  (product) =>
                      product.name
                          .toLowerCase()
                          .indexOf(searchQuery.toLowerCase()) !== -1
              )
            : selectedCategory
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
            <div className="d-flex justify-content-center">
                <div className="d-flex flex-column">
                    <div className="d-flex flex-column">
                        <NavBar />
                        <SearchInput
                            type="text"
                            name="searchQuery"
                            placeholder="Поисковая строка (по названию)"
                            className="mb-2 text-center"
                            onChange={handleSearchQuery}
                            value={searchQuery}
                        />
                        {/* <input
                            type="text"
                            name="searchQuery"
                            placeholder="Поисковая строка (по названию)"
                            className="mb-2 text-center"
                            onChange={handleSearchQuery}
                            value={searchQuery}
                        /> */}
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                        {categories && (
                            <div className="d-flex flex-column flex-shrink-0 border border-warning me-2">
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
                                <SearchStatus length={count} />
                                <SearchStatus length={products.length} />
                            </div>
                        )}
                        {/* <div className="container"> */}
                        <div className="d-flex flex-column flex-shrink-0 justify-content-between">
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
                </div>
            </div>
        );
    }
    return "Loading productsListPage.jsx";
};

ProductsListPage.propTypes = {
    products: PropTypes.array
};

export default ProductsListPage;
