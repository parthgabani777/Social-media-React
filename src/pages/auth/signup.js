import "./auth.css";
import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { signup } from "../../slices/authSlice";

function Signup() {
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const defaultSignupCredentials = {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        confirmPassword: "",
    };
    const [signupCredentials, setSignupCredentials] = useState(
        defaultSignupCredentials
    );

    const signupCredentialsChangeHandler = (e) => {
        setSignupCredentials({
            ...signupCredentials,
            [e.target.id]: e.target.value,
        });
    };

    const signupClickHandler = async (e) => {
        e.preventDefault();
        try {
            if (
                signupCredentials.password !== signupCredentials.confirmPassword
            )
                return;

            await dispatch(signup({ signupCredentials })).unwrap();
            navigation("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className="signup bg-primary">
            <form className="auth text-s">
                <div className="auth-form box-shadow p-4">
                    <h3 className="text-l text-center py-1">Signup</h3>

                    <div className="input-group py-1">
                        <label htmlFor="firstName">First name</label>
                        <input
                            type="text"
                            className="input text-s"
                            placeholder="John"
                            id="firstName"
                            value={signupCredentials.firstName}
                            onChange={signupCredentialsChangeHandler}
                        />
                    </div>

                    <div className="input-group py-1">
                        <label htmlFor="lastName">Last name</label>
                        <input
                            type="text"
                            className="input text-s"
                            id="lastName"
                            placeholder="Dave"
                            value={signupCredentials.lastName}
                            onChange={signupCredentialsChangeHandler}
                        />
                    </div>

                    <div className="input-group py-1">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="input text-s"
                            id="username"
                            placeholder="johndoe"
                            value={signupCredentials.username}
                            onChange={signupCredentialsChangeHandler}
                        />
                    </div>

                    <div className="input-group py-1">
                        <label htmlFor="password">Password</label>
                        <div className="password-input">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="input text-s"
                                id="password"
                                placeholder="************"
                                value={signupCredentials.password}
                                onChange={signupCredentialsChangeHandler}
                            />
                            <i
                                className={`fas ${
                                    showPassword ? "fa-eye-slash" : "fa-eye"
                                } `}
                                onClick={() => {
                                    setShowPassword(!showPassword);
                                }}
                            ></i>
                        </div>
                    </div>

                    <div className="input-group py-1">
                        <label htmlFor="confirm-password">
                            Confitm Password
                        </label>
                        <div className="password-input">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="input text-s"
                                id="confirm-password"
                                placeholder="************"
                                value={signupCredentials.confirmPassword}
                                onChange={(e) => {
                                    setSignupCredentials({
                                        ...signupCredentials,
                                        confirmPassword: e.target.value,
                                    });
                                }}
                            />
                            <i
                                className={`fas ${
                                    showPassword ? "fa-eye-slash" : "fa-eye"
                                } `}
                                onClick={() => {
                                    setShowPassword(!showPassword);
                                }}
                            ></i>
                        </div>
                    </div>

                    <div className="input-checkbox py-1">
                        <div>
                            <input type="checkbox" id="tc" />
                            <label htmlFor="tc">
                                I accept all terms and conditions
                            </label>
                        </div>
                    </div>

                    <div className="py-1 text-center">
                        <button
                            className="btn btn-light auth-btn br-1"
                            onClick={signupClickHandler}
                        >
                            Create an Account
                        </button>
                    </div>

                    <div className="py-1 text-center">
                        <Link to="/login" className="link-blue">
                            Already have account
                        </Link>
                    </div>
                </div>
            </form>
        </section>
    );
}

export { Signup };
