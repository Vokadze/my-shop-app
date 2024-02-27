import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "../common/form/textField";

import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
import { useAuth } from "../../hook/useAuth";

const LoginForm = () => {
    // console.log(process.env);
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });

    const history = useHistory();
    const { logIn } = useAuth();
    const [errors, setErrors] = useState({});
    const [enterError, setEnterError] = useState(null);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        setEnterError(null);

        console.log(target.name);
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            }
            // isEmail: {
            //     message: "Email введен не корректно"
            // }
        },
        password: {
            isRequired: { message: "Пароль обязателен для заполнения" }
            // isCapitalSymbol: {
            //     message: "Пароль должен содержать хотя бы одну заглавную букву"
            // },
            // isContainDigit: {
            //     message: "Пароль должен содержать хотя бы одну цифру"
            // },
            // min: {
            //     message: "Пароль должен состоять минимум из 8 символов",
            //     value: 8
            // }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);

        try {
            await logIn(data);

            history.push(
                history.location.state
                    ? history.location.state.from.pathname
                    : "/"
            );
        } catch (error) {
            setEnterError(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            >
                Оставаться в системе
            </CheckBoxField>

            {enterError && <p className="text-danger">{enterError}</p>}
            <button
                type="submit"
                disabled={!isValid || enterError}
                className="btn btn-primary w-100 mx-auto"
            >
                Submit
            </button>
        </form>
    );
};

export default LoginForm;
