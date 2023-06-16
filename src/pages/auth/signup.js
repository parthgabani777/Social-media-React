import "./auth.css";
import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { signup } from "../../slices/authSlice";
import { CustomLoader } from "../../components/customLoader/customloader";
import { toast } from "react-toastify";

function Signup() {
  const { isLoading } = useSelector((state) => state.authReducer);
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

  const fillGuestSignupCredentials = (e) => {
    e.preventDefault();
    setSignupCredentials({
      firstName: "John",
      lastName: "Dow",
      username: "johndoe",
      password: "john123",
      confirmPassword: "john123",
    });
  };

  const signupClickHandler = async (e) => {
    e.preventDefault();
    try {
      if (signupCredentials.password !== signupCredentials.confirmPassword) {
        toast.error("Password and Confirm Password should be same.");
        return;
      }
      await dispatch(signup({ signupCredentials })).unwrap();
      navigation("/");
    } catch (error) {
      toast.error(error);
    }
  };

  if (isLoading) return <CustomLoader />;

  return (
    <section className="signup bg-primary">
      <form className="auth text-s" onSubmit={signupClickHandler}>
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
              required
            />
          </div>

          <div className="input-group py-1">
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              className="input text-s"
              id="lastName"
              placeholder="Doe"
              value={signupCredentials.lastName}
              onChange={signupCredentialsChangeHandler}
              required
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
              required
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
                required
              />
              <i
                className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} `}
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              ></i>
            </div>
          </div>

          <div className="input-group py-1">
            <label htmlFor="confirm-password">Confirm Password</label>
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
                required
              />
              <i
                className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} `}
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              ></i>
            </div>
          </div>

          {/* <div className="input-checkbox py-1">
                        <div>
                            <input type="checkbox" id="tc" />
                            <label htmlFor="tc">
                                I accept all terms and conditions
                            </label>
                        </div>
                    </div> */}

          <div className="py-1 text-center">
            <button className="btn btn-light auth-btn br-1">
              Create an Account
            </button>
          </div>

          <div className="py-1 text-center">
            <button
              className="btn btn-light auth-btn br-1"
              onClick={fillGuestSignupCredentials}
            >
              Fill dummy details
            </button>
          </div>

          <div className="py-1 text-center">
            <Link to="/login" className="text-primary border-bottom">
              Already have account
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
}

export { Signup };
