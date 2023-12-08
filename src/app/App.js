import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Products from "./layouts/products";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";

const App = () => {
    return (
        <>
            {/* className="container mt-4" */}
            <NavBar />
            <Switch>
                <Route
                    path="/products/:prodId?/:edit?/:cart?"
                    component={Products}
                />
                <Route path="/login/:type?" component={Login} />
                <Route path="/" exact component={Main} />
                <Redirect to="/" />
            </Switch>
        </>
    );
};

export default App;
