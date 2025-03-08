import React from "react";
import PropTypes from "prop-types";
import BasketForm from "../components/ui/basketPageUi/basketForm";
import { getUserId } from "../service/localStorage.service";

const Basket = ({ countCartItems }) => {
    console.log(countCartItems);

    const userId = getUserId();
    if (userId) {
        return <BasketForm />;
    } else {
        return "Корзина не доступна, попробуйте зайти со своего аккаунта";
    }
};

Basket.propTypes = {
    countCartItems: PropTypes.number
};

export default Basket;
