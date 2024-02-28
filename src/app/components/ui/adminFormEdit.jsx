import React from "react";
import PropTypes from "prop-types";

import TextFieldAdmin from "../common/form/textFieldAdmin";
import SelectFieldAdmin from "../common/form/selectFieldAdmin";

import useForm from "../../hook/useForm";

const AdminFormEdit = ({ data, onSubmit, categoriesList }) => {
    const { form, handleSubmit, handleChange } = useForm(data, onSubmit);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextFieldAdmin
                    name="id"
                    value={form.id || ""}
                    onChange={handleChange}
                />
                <TextFieldAdmin
                    name="name"
                    value={form.name || ""}
                    onChange={handleChange}
                />
                <SelectFieldAdmin
                    defaultOption="Choose..."
                    name="category"
                    options={categoriesList}
                    onChange={handleChange}
                    value={form.categoriesList && ""}
                />
                <TextFieldAdmin
                    name="price"
                    value={form.price || ""}
                    onChange={handleChange}
                />
                <TextFieldAdmin
                    name="count"
                    value={form.count || ""}
                    onChange={handleChange}
                />
                <TextFieldAdmin
                    name="image"
                    value={form.image || ""}
                    onChange={handleChange}
                />
                <button type="submit" className="btn btn-primary w-100 mx-auto">
                    Edit
                </button>
            </form>
        </>
    );
};

AdminFormEdit.propTypes = {
    data: PropTypes.array,
    onSubmit: PropTypes.func,
    handleChange: PropTypes.func,
    categoriesList: PropTypes.array
};

export default AdminFormEdit;
