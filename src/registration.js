import React from "react";
import { Link } from "react-router-dom"; 

// importing hooks
import { useAuthSubmit } from "../hooks/authsubmit";
import { useStatefulFields } from "../hooks/handlechange";

export default function Registration () {

    const [values, handleChange] = useStatefulFields();
    const [error, handleSubmit] = useAuthSubmit("/register", values); 
    console.log("values", values);

    return (
        <div>
            {error && <div className="error">Ooops something went wrong!</div>}
            <div className="registration-form">
                <label htmlFor="first">Your first name</label>
                <input
                    className="registration-field"
                    name="first"
                    onChange={handleChange}
                ></input>
                <label htmlFor="last">Your last name</label>
                <input
                    className="registration-field"
                    name="last"
                    onChange={handleChange}
                ></input>
                <label htmlFor="email">Your e-mail</label>
                <input
                    className="registration-field"
                    name="email"
                    onChange={handleChange}
                ></input>
                <label htmlFor="pass">Your password</label>
                <input
                    className="registration-field"
                    name="pass"
                    onChange={handleChange}
                ></input>
                <button className="registration-button" onClick={handleSubmit}>
                    Register
                </button>
                <p className="question">
                    Already registered? <Link to="/login">Log in here</Link>
                </p>
            </div>
        </div>
    );


}