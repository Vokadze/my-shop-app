import React, { useEffect } from "react";
import { useAuth } from "../hook/useAuth";

const LogOut = () => {
    const { logOut } = useAuth();

    useEffect(() => {
        logOut();
    }, []);
    return <h1>loading</h1>;
};

export default LogOut;
