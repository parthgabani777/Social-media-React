import axios from "axios";
import { postEndpoints, userEndpoints } from "./endpoints";

const getAllPostsService = () => {
    return axios.get(postEndpoints.getAllPosts);
};

const getPostService = (postId) => {
    return axios.get(postEndpoints.getPost(postId));
};

const getUserPostsService = (userId) => {
    return axios.get(postEndpoints.getUserPost(userId));
};

const addPostService = (postData, token) => {
    return axios.post(
        postEndpoints.addPost,
        { postData },
        {
            headers: { authorization: token },
        }
    );
};

const deletePostService = (postId, token) => {
    return axios.delete(postEndpoints.deletePost(postId), {
        headers: { authorization: token },
    });
};

const editPostService = (postId, postData, token) => {
    return axios.post(
        postEndpoints.editPost(postId),
        { postData },
        {
            headers: { authorization: token },
        }
    );
};

const likePostService = (postId, token) => {
    return axios.post(
        postEndpoints.likePost(postId),
        {},
        {
            headers: { authorization: token },
        }
    );
};

const dislikePostService = (postId, token) => {
    return axios.post(
        postEndpoints.dislikePost(postId),
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
