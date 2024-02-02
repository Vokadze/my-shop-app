import React from "react";
import { useParams } from "react-router-dom";

// import api from "../api";

import AdminPageList from "../components/page/adminPageList/adminPageList";
// import AdminForm from "../components/ui/adminForm";
import AddAdminPage from "../components/page/adminPageList/addAdminPage";

const Admin = () => {
    const params = useParams();
    const { prodId, edit } = params;
    // const history = useHistory();
    // const [product, setProduct] = useState("");
    // console.log(product);

    // useEffect(() => {
    //     api.products.update(prodId).then((data) => setProduct(data));
    // }, []);

    // const handleClick = () => {
    //     history.push(history.location.pathname + "/edit");
    // };
    return (
        <>
            {prodId ? (
                edit ? (
                    <AdminPageList
                        prodId={prodId}
                        // product={product}
                        // handleClick={handleClick}
                    />
                ) : (
                    <AddAdminPage prodId={prodId} />
                )
            ) : (
                <AdminPageList />
            )}
        </>
    );
};

export default Admin;