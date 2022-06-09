import "./auth.css";
import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { login } from "../../slices/authSlice";
import { CustomLoader } from "../../components/customLoader/customloader";
import { toast } from "react-toastify";

function Login() {
    const { isLoading, error } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/";

    const [showPassword, setShowPassword] = useState(false);

    const defaultLoginCredentials = {
        username: "parthgabani",
        password: "parth123",
    };
    const [loginCredentials, setLoginCredentials] = useState(
        defaultLoginCredentials
    );
    const loginCredentialsChangeHandler = (e) => {
        setLoginCredentials({
            ...loginCredentials,
            [e.target.id]: e.target.value,
        });
    };

    const loginClickHandler = async (e) => {
        e.preventDefault();
        try {
            await dispatch(login({ loginCredentials })).unwrap();
            navigation(from);
        } catch (error) {
            toast.error(error);
        }
    };

    if (isLoading) return <CustomLoader />;

    return (
        <section className="login">
            <form className="auth text-s">
                <div className="auth-form box-shadow p-4">
                    <h3 className="text-l text-center py-1">Login</h3>

                    <div className="input-group py-1">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="text"
                            className="input text-s"
                            id="username"
                            placeholder="mail@gmail.com"
                            value={loginCredentials.username}
                            onChange={loginCredentialsChangeHandler}
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
                                value={loginCredentials.password}
                                onChange={loginCredentialsChangeHandler}
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
                            <input type="checkbox" id="remember_me" />
                            <label htmlFor="remember_me">Remember Me</label>
                        </div>
                        <a className="link-blue">Forget Password?</a>
                    </div>

                    <div className="py-1 text-center">
                        <button
                            className="btn btn-light auth-btn br-1"
                            onClick={loginClickHandler}
                        >
                            Login
                        </button>
                    </div>

                    <div className="py-1 text-center">
                        <Link to="/signup" className="link-blue">
                            Create an Account
                        </Link>
                    </div>
                </div>
            </form>
        </section>
    );
}

export { Login };
