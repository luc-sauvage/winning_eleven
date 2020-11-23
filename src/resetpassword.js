import React, { useState } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

// importing hooks
import { useStatefulFields } from "../hooks/handlechange";

export default function ResetPassword() {
    const [values, handleChange] = useStatefulFields();
    const [step, setStep] = useState(1);
    const [error, setError] = useState(false);

    const submitEmail = () => {
        let { email } = values;

        axios
            .post("/password/reset/start", { email })
            .then((resp) => {
                let data = resp.data;
                if (data.success) {
                    setStep(2);
                } else {
                    setError(true);
                    console.log("error because no success");
                }
            })
            .catch(() => {
                console.log("catch error");
                setError(true);
            });
    };

    function changePassword() {
        const { code, pass, email } = values;
        axios
            .post("/password/reset/set", { code, pass, email })
            .then((resp) => {
                let data = resp.data;
                if (data.success) {
                    setStep(3);
                } else {
                    setError(true);
                }
            })
            .catch(() => {
                setError(true);
            });
    }

    return (
        <div className="login-registration-page">
            <img src="/images/logowinning11.png"></img>
            <div className="registration-form">
                {error && (
                    <div className="error">Ooops something went wrong!</div>
                )}

                {step == 1 && (
                    <>
                        <input
                            className="field"
                            name="email"
                            placeholder="Enter your e-mail to receive secret code"
                            autoComplete="off"
                            onChange={handleChange}
                        ></input>
                        <button className="button" onClick={submitEmail}>
                            Send secret code
                        </button>
                    </>
                )}

                {step == 2 && (
                    <>
                        <input
                            className="field"
                            name="code"
                            placeholder="Insert the code you received"
                            autoComplete="off"
                            onChange={handleChange}
                        ></input>
                        <input
                            className="field"
                            name="pass"
                            placeholder="Insert your new password"
                            autoComplete="off"
                            type="password"
                            onChange={handleChange}
                        ></input>
                        <button className="button" onClick={changePassword}>
                            Submit new password
                        </button>
                    </>
                )}

                {step == 3 && (
                    <>
                        <p>You successfully changed your password</p>
                        <div className="question-container">
                            <p className="question">
                                Now you can{" "}
                                <Link to="/login">log in here</Link>
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
