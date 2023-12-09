import React from "react";
import PropTypes from "prop-types";
import NavBar from "../../ui/navBar";
import Basket from "./basket";

const BasketPage = ({
    product,
    productsItems,
    onAddProduct,
    onRemoveProduct
}) => {
    // const history = useHistory();
    // const [productsItems, setProductItems] = useState([]);
    // console.log("productPage.jsx useState productsItem", productsItems);

    // const [product, setProduct] = useState();
    // console.log("productPage.jsx useState product", product);
    // const [searchQuery, setSearchQuery] = useState("");

    // const handleSearchQuery = ({ target }) => {
    //     // setSelectedCategory(undefined);
    //     setSearchQuery(target.value);
    // };

    // useEffect(() => {
    //     api.products.getById(prodId).then((data) => setProduct(data));
    // }, []);

    // const onAddProduct = (product) => {
    //     const exist = productsItems.find((p) => p.id === product.id);
    //     if (exist) {
    //         const newCartProducts = productsItems.map((p) =>
    //             p.id === product.id ? { ...exist, qty: exist.qty + 1 } : p
    //         );
    //         setProductItems(newCartProducts);
    //         localStorage.setItem(
    //             "productsItems",
    //             JSON.stringify(newCartProducts)
    //         );
    //     } else {
    //         const newCartProducts = [...productsItems, { ...product, qty: 1 }];
    //         setProductItems(newCartProducts);
    //         localStorage.setItem(
    //             "productsItems",
    //             JSON.stringify(newCartProducts)
    //         );
    //     }
    // };

    // const onRemoveProduct = (product) => {
    //     const exist = productsItems.find((p) => p.id === product.id);
    //     if (exist.qty === 1) {
    //         const newCartProducts = productsItems.filter(
    //             (p) => p.id !== product.id
    //         );
    //         setProductItems(newCartProducts);
    //         localStorage.setItem(
    //             "productsItems",
    //             JSON.stringify(newCartProducts)
    //         );
    //     } else {
    //         const newCartProducts = productsItems.map((p) =>
    //             p.id === product.id ? { ...exist, qty: exist.qty - 1 } : p
    //         );
    //         setProductItems(newCartProducts);
    //         localStorage.setItem(
    //             "productsItems",
    //             JSON.stringify(newCartProducts)
    //         );
    //     }
    // };

    // useEffect(() => {
    //     setProductItems(
    //         localStorage.getItem("productsItems")
    //             ? JSON.parse(localStorage.getItem("productsItems"))
    //             : []
    //     );
    // }, []);

    if (product) {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <NavBar productsItems={productsItems} />
                        {/* <SearchInput
                            type="text"
                            name="searchQuery"
                            placeholder="Поисковая строка (по названию)"
                            className="mb-2 text-center"
                            onChange={handleSearchQuery}
                            value={searchQuery}
                        /> */}

                        {/* <input
                            type="text"
                            name="searchQuery"
                            placeholder="Путь к товару"
                            className="mb-4 text-center border"
                        /> */}

                        <Basket
                            productsItems={productsItems}
                            onAddProduct={onAddProduct}
                            onRemoveProduct={onRemoveProduct}
                        />

                        {/* <BasketList
                            product={product}
                            item={productsItems.find(
                                (p) => p.id === product.id
                            )}
                            // productsItems={productsItems}
                            onAddProduct={onAddProduct}
                            onRemoveProduct={onRemoveProduct}
                        /> */}
                    </div>
                </div>
            </div>
        );
    } else {
        return "loading basketPage.jsx";
    }
};

BasketPage.propTypes = {
    product: PropTypes.object.isRequired,
    productsItems: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onAddProduct: PropTypes.func,
    onRemoveProduct: PropTypes.func
};

export default BasketPage;
