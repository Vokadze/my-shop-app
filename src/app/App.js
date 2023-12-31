import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Products from "./layouts/products";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";
import Basket from "./layouts/basket";
import AdminPage from "./components/page/adminPage/adminPage";
// import AdminPage0 from "./components/page/adminPage/adminPage0";

const App = () => {
    return (
        <div style={{ background: "#e9ecef" }}>
            <NavBar />
            <Switch>
                <Route path="/products/:prodId?" component={Products} />
                <Route path="/login/:type?" component={Login} />
                {/* <Route path="/adminPage0" component={AdminPage0} /> */}
                <Route path="/adminPage" component={AdminPage} />
                <Route path="/basket" component={Basket} />
                <Route path="/" exact component={Main} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
};

export default App;
