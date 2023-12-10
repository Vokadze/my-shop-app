import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import Products from "./layouts/products";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";
import BasketHeader from "./components/page/basketProductsPage/basketHeader";

const App = ({ productsItems, onAddProduct, onRemoveProduct }) => {
    return (
        <>
            {/* className="container mt-4" */}
            <NavBar />
            <Switch>
                <Route path="/products/:prodId?/:edit?" component={Products} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/basketHeader" component={BasketHeader} />
                <Route path="/" exact component={Main} />
                <Redirect to="/" />
            </Switch>
        </>
    );
};

App.propTypes = {
    productsItems: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onAddProduct: PropTypes.func,
    onRemoveProduct: PropTypes.func
};

export default App;
