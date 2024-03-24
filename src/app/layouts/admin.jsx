import React from "react";
import { useParams } from "react-router-dom";

// import api from "../api";

import AdminPageList from "../components/page/adminPageList/adminPageList";
import ProductProvider from "../hook/useProducts";
// import { CategoryProvider } from "../hook/useCategory";
import AdminProduct from "../components/ui/adminPageUi/adminProduct";
import { CategoryProvider } from "../hook/useCategory";
import { nanoid } from "nanoid";

const Admin = () => {
    const params = useParams();
    const nanoId = nanoid;
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
                            <AdminProduct prodId={prodId} nanoId={nanoId} />
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
