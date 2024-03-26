import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
// import api from "../../../api";
import GroupList from "../../common/groupList";
import ProductsTable from "../../ui/productsTable";
import SearchInput from "../../common/form/searchInput";

import _ from "lodash";
import NavBar from "../../ui/navBar";
import { useDispatch, useSelector } from "react-redux";
import {
    getCategories,
    getCategoriesLoadingStatus
} from "../../../store/categories";
import { getProductById, getProducts } from "../../../store/products";

const ProductsListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState();
    // console.log(selectedCategory);
    const [sortBy, setSortBy] = useState({ iter: "price", order: "asc" });
    const pageSize = 4;

    const dispatch = useDispatch();
    const products = useSelector(getProducts());
    // console.log("products App.jsx", products);

    const categories = useSelector(getCategories());
    const categoriesLoading = useSelector(getCategoriesLoadingStatus());
    // console.log("categories App.jsx", categories);

    const handleClick = (prodId) => {
        dispatch(getProductById(prodId));
        // getProductById(prodId);
        // setProducts(products.filter((product) => product._id === prodId));
        // console.log(prodId);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchQuery, products]);

    const handleCategoriesSelect = (item) => {
        if (searchQuery !== "") setSearchQuery("");
        setSelectedCategory(item);
        console.log(item);
    };

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

    // if (products) {
    // function filterProducts(data) {
    //     const filteredProducts = searchQuery
    //         ? data.filter(
    //               (product) =>
    //                   product.name
    //                       .toLowerCase()
    //                       .indexOf(searchQuery.toLowerCase()) !== -1
    //           )
    //         : selectedCategory
    //           ? data.filter(
    //                 (product) =>
    //                     JSON.stringify(product.category) ===
    //                     JSON.stringify(selectedCategory)
    //             )
    //           : data;

    //     return filteredProducts.filter((p) => p._id === data);
    // }

    // const filteredProducts = filterProducts(products);

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
                    JSON.stringify(selectedCategory._id)
            )
          : products;

    const count = filteredProducts.length;
    // console.log(count);

    const sortedProducts = _.orderBy(
        filteredProducts,
        [sortBy.path],
        [sortBy.order]
    );

    const productCrop = paginate(sortedProducts, currentPage, pageSize);
    // console.log(productCrop);

    const clearFilter = () => {
        setSelectedCategory();
    };

    return (
        <div className="d-flex justify-content-center px-4">
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
                </div>
                <div className="d-flex flex-row">
                    {categories && !categoriesLoading && (
                        <div
                            className="d-flex flex-column border border-warning"
                            style={{ background: "#dee2e6" }}
                        >
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
                    <div className="d-flex flex-column justify-content-between">
                        <div className="container px-0 m-0">
                            <ProductsTable
                                products={productCrop}
                                onSort={handleSort}
                                selectedSort={sortBy}
                                handleClick={handleClick}
                            />
                        </div>
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
    // }
    // return "Loading productsListPage.jsx";
};

ProductsListPage.propTypes = {
    products: PropTypes.array
};

export default ProductsListPage;
