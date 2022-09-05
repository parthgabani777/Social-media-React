import axios from "axios";
import { authEndpoints } from "./endpoints";

const loginUserService = ({ username, password }) => {
    return axios.post(authEndpoints.login, {
        username,
        password,
    });
};

const signupUserService = async ({
    firstName,
    lastName,
    username,
    password,
}) => {
    return axios.post(authEndpoints.signup, {
        firstName,
        lastName,
        username,
        password,
    });
};

export { loginUserService, signupUserService };
