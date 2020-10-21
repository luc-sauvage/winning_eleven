import React from "react";
import { Link } from "react-router-dom";

// importing hooks
import { useAuthSubmit } from "../hooks/authsubmit";
import { useStatefulFields } from "../hooks/handlechange";

export default function Registration() {
    const [values, handleChange] = useStatefulFields();
    const [error, handleSubmit] = useAuthSubmit("/register", values);
    console.log("values", values);

    return (
        <div className="login-registration-page">
            <img src="/images/logowinning11.png"></img>
            <div className="registration-form">
                {error && (
                    <div className="error">Ooops something went wrong!</div>
                )}
                {/* <label htmlFor="first">Your first name</label> */}
                <input
                    className="field"
                    name="first"
                    placeHolder="Your first name"
                    autocomplete="off"
                    onChange={handleChange}
                ></input>
                {/* <label htmlFor="last">Your last name</label> */}
                <input
                    className="field"
                    name="last"
                    placeHolder="Your last name"
                    autocomplete="off"
                    onChange={handleChange}
                ></input>
                {/* <label htmlFor="email">Your e-mail</label> */}
                <input
                    className="field"
                    name="email"
                    placeHolder="Your e-mail"
                    autocomplete="off"
                    onChange={handleChange}
                ></input>
                {/* <label htmlFor="pass">Your password</label> */}
                <input
                    className="field"
                    name="pass"
                    placeHolder="Your password"
                    autocomplete="off"
                    onChange={handleChange}
                ></input>
                <button className="button" onClick={handleSubmit}>
                    Register
                </button>
                <div className="question-container">
                    <p className="question">
                        Already registered? <Link to="/login">Log in here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
