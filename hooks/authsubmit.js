import { useState } from "react";
import axios from "axios";

export function useAuthSubmit(url, values) {
    console.log("submit running");
    const [error, setError] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(url, values)
            .then(({ data }) => {
                console.log("server response", data.success);
                console.log(values);
                data.success ? location.replace("/") : setError(true);
            })
            .catch((err) => {
                console.log(`error in axios post /${url}`, err);
                setError(true);
            });
    };

    return [error, handleSubmit];
}