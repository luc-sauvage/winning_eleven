import { useState } from "react";
import axios from "../src/axios";

export function useAuthSubmit(url, values) {
    const [error, setError] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(url, values)
            .then(({ data }) => {
                data.success ? location.replace("/") : setError(true);
            })
            .catch((err) => {
                console.log(`error in axios post /${url}`, err);
                setError(true);
            });
    };

    return [error, handleSubmit];
}
