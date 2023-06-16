import axios from "axios";
import { COMMENT_URL } from "./constant";

const getCommentsService = (postId) => {
  return axios.get(`${COMMENT_URL}/${postId}`);
};

const addCommentService = (commentData, postId, token) => {
  return axios.post(
    `${COMMENT_URL}/add/${postId}`,
    { commentData },
    {
      headers: { authorization: token },
    }
  );
};

const editCommentService = (commentData, postId, commentId, token) => {
  return axios.post(
    `${COMMENT_URL}/edit/${postId}/${commentId}`,
    { commentData },
    {
      headers: { authorization: token },
    }
  );
};

const deleteCommentService = (postId, commentId, token) => {
  return axios.post(`${COMMENT_URL}/delete/${postId}/${commentId}`, {
    headers: { authorization: token },
  });
};

export {
  getCommentsService,
  addCommentService,
  editCommentService,
  deleteCommentService,
};
