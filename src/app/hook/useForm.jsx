import { useState } from "react";

const useForm = (initialState = {}, onSubmit) => {
    const [form, setForm] = useState(initialState);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(form);
    };

    const handleChange = (target) => {
        setForm((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));

        console.log(target.name);
    };

    return { form, handleChange, handleSubmit };
};

export default useForm;
