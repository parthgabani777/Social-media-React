import axios from "axios";

const loginUserService = async ({ username, password }) => {
    const { data } = await axios.post("/api/auth/login", {
        username,
        password,
    });
    return data;
};

const signupUserService = async ({
    firstName,
    lastName,
    username,
    password,
}) => {
    const { data } = await axios.post("/api/auth/signup", {
        firstName,
        lastName,
        username,
        password,
    });
    return data;
};

export { loginUserService, signupUserService };
