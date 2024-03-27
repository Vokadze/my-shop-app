import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Products from "./layouts/products";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";
import Basket from "./layouts/basket";
import Admin from "./layouts/admin";
import AdminForm from "./components/ui/adminPageUi/adminForm";
import AuthProvider from "./hook/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import { useDispatch } from "react-redux";
import { loadCategoriesList } from "./store/categories";
import { loadProductsList } from "./store/products";

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCategoriesList());
        dispatch(loadProductsList());
    }, []);
    return (
        <div style={{ background: "#e9ecef" }}>
            <AuthProvider>
                <NavBar />
                <Switch>
                    <Route path="/admin/:edit?/:prodId?" component={Admin} />
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
            </AuthProvider>
            <ToastContainer />
        </div>
    );
};

export default App;
