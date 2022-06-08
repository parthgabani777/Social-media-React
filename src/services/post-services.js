import axios from "axios";

const getAllPostsService = () => {
    return axios.get("/api/posts");
};

const getPostService = (postId) => {
    return axios.get(`/api/posts/${postId}`);
};

const getUserPostsService = (userId) => {
    return axios.get(`/api/posts/user/${userId}`);
};

const addPostService = (postData, token) => {
    return axios.post(
        "/api/posts",
        { postData },
        {
            headers: { authorization: token },
        }
    );
};

const deletePostService = (postId, token) => {
    return axios.delete(`/api/posts/${postId}`, {
        headers: { authorization: token },
    });
};

const editPostService = (postId, postData, token) => {
    return axios.post(
        `/api/posts/edit/${postId}`,
        { postData },
        {
            headers: { authorization: token },
        }
    );
};

const likePostService = (postId, token) => {
    return axios.post(
        `/api/posts/like/${postId}`,
        {},
        {
            headers: { authorization: token },
        }
    );
};

const dislikePostService = (postId, token) => {
    return axios.post(
        `/api/posts/dislike/${postId}`,
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
