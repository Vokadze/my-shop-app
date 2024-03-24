import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "../../common/form/textField";
import { validator } from "../../../utils/validator";
// import api from "../../api";

import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import CheckBoxField from "../../common/form/checkBoxField";
import { useCategories } from "../../../hook/useCategory";
import { useAuth } from "../../../hook/useAuth";

const RegisterForm = () => {
    const history = useHistory();
    const [data, setData] = useState({
        email: "",
        password: "",
        category: "",
        sex: "male",
        name: "",
        licence: false
    });
    const { signUp } = useAuth();
    const { categories } = useCategories();
    console.log(categories);
    const categoriesList = categories.map((c) => ({
        label: c.name,
        value: c._id
    }));
    const [errors, setErrors] = useState({});

    // useEffect(() => {
    //     api.categories.fetchAll().then((data) => setCategories(data));
    // }, []);

    useEffect(() => {
        console.log(categories);
    }, [categories]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));

        console.log(target.name);
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен не корректно"
            }
        },
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            },
            min: {
                message: "Имя должно состоять минимум из 3 символов",
                value: 3
            }
        },
        password: {
            isRequired: { message: "Пароль обязателен для заполнения" },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одну цифру"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        },
        category: {
            isRequired: {
                message: "Обязательно выберите категорию товара"
            }
        },
        licence: {
            isRequired: {
                message:
                    "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
            }
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
            await signUp(data);
            history.push("/");
        } catch (error) {
            setErrors(error);
            console.log(error);
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
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <SelectField
                label="Выберите категорию товара"
                defaultOption="Choose..."
                name="category"
                options={categoriesList}
                onChange={handleChange}
                value={data.category}
                error={errors.category}
            />
            <RadioField
                label="Выберите ваш пол"
                options={[
                    { name: "Мужской", value: "male" },
                    { name: "Женский", value: "female" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
            />
            <CheckBoxField
                value={data.licence}
                onChange={handleChange}
                name="licence"
                error={errors.licence}
            >
                Подтвердить <a>лицензионное соглашение</a>
            </CheckBoxField>
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Submit
            </button>
        </form>
    );
};

export default RegisterForm;
