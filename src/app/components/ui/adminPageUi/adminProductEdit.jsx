import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import AdminForm from "./adminForm";

const AdminProductEdit = ({
    onSubmit,
    prodId,
    nanoId,
    product,
    categoriesList
}) => {
    console.log(prodId);
    const history = useHistory();
    const handleSubmit = (data) => {
        console.log(data);
        onSubmit(data);
        history.push("/admin");
    };

    return (
        <>
            <AdminForm
                onSubmit={handleSubmit}
                key={prodId || nanoId}
                data={product}
                categoriesList={categoriesList}
            />
        </>
    );
};

AdminProductEdit.propTypes = {
    onSubmit: PropTypes.func,
    prodId: PropTypes.string,
    nanoId: PropTypes.string,
    product: PropTypes.object,
    categoriesList: PropTypes.array
};

export default AdminProductEdit;
