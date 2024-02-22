import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
// import api from "../../../api";
import SearchInput from "../../ui/searchInput";

import _ from "lodash";
import NavBar from "../../ui/navBar";
import AdminTable from "../../ui/adminTable";
// import AdminForm from "../../ui/adminForm";
// import AdminFormAdd from "../../ui/adminFormAdd";
import { useProduct } from "../../../hook/useProducts";
import { useCategories } from "../../../hook/useCategory";
import AdminFormEdit from "../../ui/adminFormEdit";
// import axios from "axios";
// import configFile from "../../../config.json";

const AdminPageList = () => {
    // console.log(prodId);
    const [currentPage, setCurrentPage] = useState(1);
    // const [categories, setCategories] = useState();
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 4;

    // const [products, setProducts] = useState("");
    // const [product, setProduct] = useState("");

    const { products } = useProduct();
    console.log(products);

    const { product } = useProduct();

    const { categories } = useCategories();

    // useEffect(() => {
    //     api.products.fetchAll().then((data) => setProducts(data));
    // }, []);

    // useEffect(() => {
    //     const promise = axios
    //         .get(configFile.apiEndpoint2)
    //         .then((res) => console.log(res.data));
    //     console.log(promise);
    // }, []);

    const handleDelete = (prodId) => {
        // setProducts(products.filter((product) => product.id !== prodId));
        console.log(prodId);
    };
    const handleClick = (prodId) => {
        // api.products.getById(prodId).then((data) => setProduct(data));
        // history.push(history.location.pathname + "/edit");
        console.log(prodId);
    };

    // useEffect(() => {
    //     api.categories.fetchAll().then((data) => setCategories(data));
    // }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, products]);

    const handleSearchQuery = ({ target }) => {
        setSearchQuery(target.value);
    };

    const handlePageChange = (pageIndex) => {
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
            : products;

        const count = filteredProducts.length;

        const sortedProducts = _.orderBy(
            filteredProducts,
            [sortBy.path],
            [sortBy.order]
        );

        const productCrop = paginate(sortedProducts, currentPage, pageSize);

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
                        {categories && (
                            <>
                                <div
                                    className="card text-center border border-warning"
                                    style={{
                                        width: "14rem",
                                        background: "#dee2e6"
                                    }}
                                >
                                    <div className="card-body">
                                        <h6 className="card-title">
                                            Блок для добавления или
                                            редактирования товара
                                        </h6>
                                        {/* {!prodId ? ( */}
                                        <AdminFormEdit
                                            // prodId={prodId}
                                            product={product}
                                            handleClick={handleClick}
                                        />
                                        {/* ) : (
                                            <AdminFormAdd
                                                product={product}
                                                // handleClick={handleClick}
                                            />
                                        )} */}
                                        {/* <AdminForm
                                        product={product}
                                        prodId={prodId}
                                        handleClick={handleClick}
                                    /> */}
                                    </div>
                                </div>
                            </>
                        )}
                        <div className="d-flex flex-column justify-content-between">
                            <div className="container px-0 m-0">
                                <AdminTable
                                    products={productCrop}
                                    onSort={handleSort}
                                    selectedSort={sortBy}
                                    handleDelete={handleDelete}
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
    }
    return "Loading productsListPage.jsx";
};

AdminPageList.propTypes = {
    products: PropTypes.array,
    product: PropTypes.array,
    prodId: PropTypes.string
};

export default AdminPageList;
