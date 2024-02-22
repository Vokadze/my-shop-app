import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Products from "./layouts/products";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";
import Basket from "./layouts/basket";
import Admin from "./layouts/admin";
import AdminFormAdd from "./components/ui/adminFormAdd";
import AdminFormEdit from "./components/ui/adminFormEdit";
import ProductProvider from "./hook/useProducts";
import { CategoryProvider } from "./hook/useCategory";
// import AdminPageList from "./components/page/adminPageList/adminPageList";

const App = () => {
    return (
        <div style={{ background: "#e9ecef" }}>
            <NavBar />
            <ProductProvider>
                <CategoryProvider>
                    <Switch>
                        <Route path="/products/:prodId?" component={Products} />
                        <Route path="/login/:type?" component={Login} />
                        <Route path="/admin/:prodId?" component={Admin} />
                        <Route path="/adminFormAdd" component={AdminFormAdd} />
                        <Route
                            path="/adminFormChange"
                            component={AdminFormEdit}
                        />
                        {/* <Route path="/adminPagelist" component={AdminPageList} /> */}
                        <Route path="/basket" component={Basket} />
                        <Route path="/" exact component={Main} />
                        <Redirect to="/" />
                    </Switch>
                </CategoryProvider>
            </ProductProvider>
        </div>
    );
};

export default App;
