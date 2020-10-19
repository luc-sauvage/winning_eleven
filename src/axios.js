import axios from "axios";

var instance = axios.create({
    xsrfCookieName: "mytoken",
    xsrfHeaderName: "csrf-token", //csurf middleware is checking this headers to validate a request
});

export default instance;
