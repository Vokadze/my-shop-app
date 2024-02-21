import React from "react";
import { useParams } from "react-router-dom";

// import api from "../api";

import AdminPageList from "../components/page/adminPageList/adminPageList";
import ProductProvider from "../hook/useProducts";
import { CategoryProvider } from "../hook/useCategory";
// import AdminForm from "../components/ui/adminForm";
// import AddAdminPage from "../components/page/adminPageList/addAdminPage";

const Admin = () => {
    const params = useParams();
    const { prodId, edit } = params;
    // const history = useHistory();
    // const [product, setProduct] = useState("");
    // console.log(product);

    // useEffect(() => {
    //     api.products.update(prodId).then((data) => setProduct(data));
    // }, []);

    return (
        <>
            <ProductProvider>
                <CategoryProvider>
                    {prodId ? (
                        edit ? (
                            <AdminPageList prodId={prodId} />
                        ) : (
                            <AdminPageList />
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
