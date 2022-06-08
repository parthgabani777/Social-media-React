import axios from "axios";

const getCommentsService = (postId) => {
    return axios.get(`/api/comments/${postId}`);
};

const addCommentService = (commentData, postId, token) => {
    return axios.post(
        `/api/comments/add/${postId}`,
        { commentData },
        {
            headers: { authorization: token },
        }
    );
};

const editCommentService = (commentData, postId, commentId, token) => {
    return axios.post(
        `/api/comments/edit/${postId}/${commentId}`,
        { commentData },
        {
            headers: { authorization: token },
        }
    );
};

const deleteCommentService = (postId, commentId, token) => {
    return axios.post(`/api/comments/delete/${postId}/${commentId}`, {
        headers: { authorization: token },
    });
};

export {
    getCommentsService,
    addCommentService,
    editCommentService,
    deleteCommentService,
};
