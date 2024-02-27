import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Products from "./layouts/products";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";
import Basket from "./layouts/basket";
import Admin from "./layouts/admin";
// import AdminFormAdd from "./components/ui/adminFormAdd";
import AdminFormEdit from "./components/ui/adminFormEdit";
import ProductProvider from "./hook/useProducts";
import { CategoryProvider } from "./hook/useCategory";
import AuthProvider from "./hook/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
// import AdminPageList from "./components/page/adminPageList/adminPageList";

const App = () => {
    return (
        <div style={{ background: "#e9ecef" }}>
            <AuthProvider>
                <NavBar />
                <CategoryProvider>
                    <ProductProvider>
                        <Switch>
                            <ProtectedRoute
                                path="/products/:prodId?"
                                component={Products}
                            />
                            <Route path="/login/:type?" component={Login} />
                            <Route path="/admin/:prodId?" component={Admin} />
                            {/* <Route
                                path="/adminFormAdd"
                                component={AdminFormAdd}
                            /> */}
                            <Route
                                path="/adminFormChange"
                                component={AdminFormEdit}
                            />
                            {/* <Route path="/adminPagelist" component={AdminPageList} /> */}
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
