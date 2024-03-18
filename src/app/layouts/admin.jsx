import React from "react";
import { useParams } from "react-router-dom";

// import api from "../api";

import AdminPageList from "../components/page/adminPageList/adminPageList";
import ProductProvider from "../hook/useProducts";
import { CategoryProvider } from "../hook/useCategory";
// import AdminFormEdit from "../components/ui/adminPageUi/adminFormEdit";
import AdminProductEditAdd from "../components/ui/adminPageUi/adminProductEditAdd";
// import AdminForm from "../components/ui/adminForm";
// import AddAdminPage from "../components/page/adminPageList/addAdminPage";

const Admin = () => {
    const params = useParams();
    const { prodId, edit } = params;
    console.log(prodId);

    return (
        <>
            <ProductProvider>
                <CategoryProvider>
                    {prodId ? (
                        edit ? (
                            <AdminPageList prodId={prodId} />
                        ) : (
                            <AdminProductEditAdd prodId={prodId} />
                        )
                    ) : (
                        <AdminPageList />
                    )}
                </CategoryProvider>
            </ProductProvider>
        </>
    );
};

export default Admin;
