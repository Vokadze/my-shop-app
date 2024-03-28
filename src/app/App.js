import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Products from "./layouts/products";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";
import Basket from "./layouts/basket";
import Admin from "./layouts/admin";
import AdminForm from "./components/ui/adminPageUi/adminForm";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import AppLoader from "./components/ui/hoc/appLoader";

const App = () => {
    return (
        <div style={{ background: "#e9ecef" }}>
            <AppLoader>
                <NavBar />
                <Switch>
                    <ProtectedRoute
                        path="/admin/:edit?/:prodId?"
                        component={Admin}
                    />
                    <ProtectedRoute
                        path="/products/:prodId?"
                        component={Products}
                    />
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/adminForm" component={AdminForm} />
                    <Route path="/basket" component={Basket} />
                    <Route path="/logout" component={LogOut} />
                    <Route path="/" exact component={Main} />
                    <Redirect to="/" />
                </Switch>
            </AppLoader>
            <ToastContainer />
        </div>
    );
};

export default App;
