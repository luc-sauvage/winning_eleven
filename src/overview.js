import React, { useEffect } from "react";
import axios from "axios";

export default function Overview () {

    useEffect(() => {
        axios.get("/stats").then((serverResponse) => {
            console.log(serverResponse.data)
        })
    }, []); 

    return (
        <h1>
            HELLO ALE & LUCA

        </h1>
    )
}