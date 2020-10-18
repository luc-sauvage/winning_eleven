import React from "react";

import { Link } from "react-router-dom";
import { useAuthSubmit } from "../hooks/authsubmit";
import { useStatefulFields } from "../hooks/handlechange";

export default function Login() {
    const [values, handleChange] = useStatefulFields();
    const [error, handleSubmit] = useAuthSubmit("/login", values);

    return (
        <div className="registration-container">
            {error && <div className="error">Ooops something went wrong!</div>}
            <div className="registration-form">
                <label htmlFor="email">Your email</label>
                <input
                    className="login-field"
                    name="email"
                    onChange={handleChange}
                ></input>
                <label htmlFor="pass">Your password</label>
                <input
                    className="login-field"
                    name="pass"
                    onChange={handleChange}
                ></input>
                <button className="login-button" onClick={handleSubmit}>
                    Log-in
                </button>
                <p className="question">
                    Not registered yet? <Link to="/registration">Do it here</Link>
                </p>
                <p className="question">
                    Forgot password? <Link to="/reset">Ask for a new one</Link>
                </p>
            </div>
        </div>
    );
}