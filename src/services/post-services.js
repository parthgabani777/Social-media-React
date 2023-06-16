import axios from "axios";
import { POST_URL } from "./constant";

const getAllPostsService = () => {
  return axios.get(POST_URL);
};

const getPostService = (postId) => {
  return axios.get(`${POST_URL}/${postId}`);
};

const getUserPostsService = (userId) => {
  return axios.get(`${POST_URL}/user/${userId}`);
};

const addPostService = (postData, token) => {
  return axios.post(
    `${POST_URL}`,
    { postData },
    {
      headers: { authorization: token },
    }
  );
};

const deletePostService = (postId, token) => {
  return axios.delete(`${POST_URL}/${postId}`, {
    headers: { authorization: token },
  });
};

const editPostService = (postId, postData, token) => {
  return axios.post(
    `${POST_URL}/edit/${postId}`,
    { postData },
    {
      headers: { authorization: token },
    }
  );
};

const likePostService = (postId, token) => {
  return axios.post(
    `${POST_URL}/like/${postId}`,
    {},
    {
      headers: { authorization: token },
    }
  );
};

const dislikePostService = (postId, token) => {
  return axios.post(
    `${POST_URL}/dislike/${postId}`,
    {},
    {
      headers: { authorization: token },
    }
  );
};

export {
  getAllPostsService,
  getPostService,
  getUserPostsService,
  addPostService,
  deletePostService,
  editPostService,
  likePostService,
  dislikePostService,
};
