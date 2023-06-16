import axios from "axios";

const loginUserService = ({ username, password }) => {
  return axios.post("/api/auth/login", {
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
  return axios.post("/api/auth/signup", {
    firstName,
    lastName,
    username,
    password,
  });
};

export { loginUserService, signupUserService };
