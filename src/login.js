import React from "react";

import { Link } from "react-router-dom";
import { useAuthSubmit } from "../hooks/authsubmit";
import { useStatefulFields } from "../hooks/handlechange";

export default function Login() {
    const [values, handleChange] = useStatefulFields();
    const [error, handleSubmit] = useAuthSubmit("/login", values);

    return (
        <div className="login-registration-page">
            {" "}
            <img src="/images/logowinning11.png"></img>
            <div className="registration-container">
                {error && (
                    <div className="error">Ooops something went wrong!</div>
                )}
                <div className="registration-form">
                    {/* <label htmlFor="email">Your email</label> */}
                    <input
                        className="field"
                        name="email"
                        onChange={handleChange}
                        placeholder="E-Mail"
                        autoComplete="off"
                    ></input>
                    {/* <label htmlFor="pass">Your password</label> */}
                    <input
                        className="field"
                        name="pass"
                        onChange={handleChange}
                        placeholder="Password"
                        autoComplete="off"
                        type="password"
                    ></input>
                    <button className="button" onClick={handleSubmit}>
                        Log-in
                    </button>
                    <div className="question-container">
                        <p className="question">
                            Not registered yet?{" "}
                            <Link to="/registration">Do it here</Link>
                        </p>
                        <p className="question">
                            Forgot password?{" "}
                            <Link to="/resetpassword">Ask for a new one</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
