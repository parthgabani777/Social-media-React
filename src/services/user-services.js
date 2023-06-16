import axios from "axios";
import { USER_URL } from "./constant";

const getAllUsersService = () => {
  return axios.get(USER_URL);
};

const getUserService = (userId) => {
  return axios.get(`${USER_URL}/${userId}`);
};

const postUserDataService = (userData, token) => {
  return axios.post(
    `${USER_URL}/edit`,
    { userData },
    {
      headers: { authorization: token },
    }
  );
};

const getBookmarksService = (token) => {
  return axios.get(
    `${USER_URL}/bookmark`,
    {},
    {
      headers: { authorization: token },
    }
  );
};

const addBookmarkService = (postId, token) => {
  return axios.post(
    `${USER_URL}/bookmark/${postId}`,
    {},
    {
      headers: { authorization: token },
    }
  );
};

const removeBookmarkService = (postId, token) => {
  return axios.post(
    `${USER_URL}/remove-bookmark/${postId}`,
    {},
    {
      headers: { authorization: token },
    }
  );
};

const followUserService = (followUserId, token) => {
  return axios.post(
    `${USER_URL}/follow/${followUserId}`,
    {},
    {
      headers: { authorization: token },
    }
  );
};

const unfollowUserService = (followUserId, token) => {
  return axios.post(
    `${USER_URL}/unfollow/${followUserId}`,
    {},
    {
      headers: { authorization: token },
    }
  );
};

export {
  getAllUsersService,
  getUserService,
  postUserDataService,
  getBookmarksService,
  addBookmarkService,
  removeBookmarkService,
  followUserService,
  unfollowUserService,
};
