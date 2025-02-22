import React from "react";
import BasketForm from "../components/ui/basketPageUi/basketForm";
import { useParams } from "react-router-dom";

const Basket = () => {
    const param = useParams();
    console.log(param);

    return <BasketForm />;
};

export default Basket;
