import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Products from "./layouts/products";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";
import BasketHeader from "./layouts/basketHeader";

const App = () => {
    return (
        <div style={{ background: "#e9ecef" }}>
            <NavBar />
            <Switch>
                <Route path="/products/:prodId?" component={Products} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/basketHeader" component={BasketHeader} />
                <Route path="/" exact component={Main} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
};

export default App;
