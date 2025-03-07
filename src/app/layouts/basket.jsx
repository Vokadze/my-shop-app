import React from "react";
import BasketForm from "../components/ui/basketPageUi/basketForm";
import { getUserId } from "../service/localStorage.service";

const Basket = () => {
    const userId = getUserId();
    if (userId) {
        return <BasketForm />;
    } else {
        return "Корзина не доступна, попробуйте зайти со своего аккаунта";
    }
};

export default Basket;
