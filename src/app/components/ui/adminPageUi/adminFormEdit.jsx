import React from "react";
// import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import TextFieldAdmin from "../../common/form/textFieldAdmin";
import SelectFieldAdmin from "../../common/form/selectFieldAdmin";
import useForm from "../../../hook/useForm";
// import { useCategories } from "../../../hook/useCategory";

// const useForm = (initialState = {}, onSubmit) => {
//     const [form, setForm] = useState(initialState);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onSubmit(form);
//     };

//     const handleChange = (target) => {
//         setForm((prevState) => ({
//             ...prevState,
//             [target.name]: target.value
//         }));

//         console.log(target.name);
//     };

//     return { form, handleChange, handleSubmit };
// };

const AdminFormEdit = ({ data, onSubmit, categoriesList }) => {
    const { form, handleChange, handleSubmit } = useForm(data, onSubmit);
    // const [form, setForm] = useState(data || {});

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     onSubmit(form);
    // };

    // const handleChange = (target) => {
    //     setForm((prevState) => ({
    //         ...prevState,
    //         [target.name]: target.value
    //     }));

    //     console.log(target.name);
    // };

    return (
        <>
            <form onSubmit={handleSubmit}>
                {/* <TextFieldAdmin
                    name="numProd"
                    value={form.prodNum || ""}
                    onChange={handleChange}
                /> */}
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
                    value={form.category || ""}
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
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onSubmit: PropTypes.func,
    handleChange: PropTypes.func,
    categoriesList: PropTypes.array
};

export default AdminFormEdit;
