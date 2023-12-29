import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Products from "./layouts/products";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";
import BasketHeader from "./layouts/basketHeader";
import AdminPage1 from "./components/page/adminPage/adminPage1";
// import AdminPage0 from "./components/page/adminPage/adminPage0";

const App = () => {
    return (
        <div style={{ background: "#e9ecef" }}>
            <NavBar />
            <Switch>
                <Route path="/products/:prodId?" component={Products} />
                <Route path="/login/:type?" component={Login} />
                {/* <Route path="/adminPage0" component={AdminPage0} /> */}
                <Route path="/adminPage1" component={AdminPage1} />
                <Route path="/basketHeader" component={BasketHeader} />
                <Route path="/" exact component={Main} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
};

export default App;
