import axios from "axios";
import { AUTH_URL } from "./constant";

const loginUserService = ({ username, password }) => {
  return axios.post(`${AUTH_URL}/login`, {
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
  return axios.post(`${AUTH_URL}/signup`, {
    firstName,
    lastName,
    username,
    password,
  });
};

export { loginUserService, signupUserService };
