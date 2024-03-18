import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Products from "./layouts/products";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";
import Basket from "./layouts/basket";
import Admin from "./layouts/admin";
import AdminFormEdit from "./components/ui/adminPageUi/adminFormEdit";
import ProductProvider from "./hook/useProducts";
import { CategoryProvider } from "./hook/useCategory";
import AuthProvider from "./hook/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";

const App = () => {
    return (
        <div style={{ background: "#e9ecef" }}>
            <AuthProvider>
                <NavBar />
                <CategoryProvider>
                    <ProductProvider>
                        <Switch>
                            <Route
                                path="/admin/:edit?/:prodId?"
                                component={Admin}
                            />
                            <ProtectedRoute
                                path="/products/:prodId?"
                                component={Products}
                            />
                            <Route path="/login/:type?" component={Login} />
                            <Route
                                path="/adminFormChange"
                                component={AdminFormEdit}
                            />
                            <Route path="/basket" component={Basket} />
                            <Route path="/logout" component={LogOut} />
                            <Route path="/" exact component={Main} />
                            <Redirect to="/" />
                        </Switch>
                    </ProductProvider>
                </CategoryProvider>
            </AuthProvider>
            <ToastContainer />
        </div>
    );
};

export default App;
