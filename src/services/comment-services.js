import axios from "axios";

const getCommentsService = async (postId) => {
    const {
        data: { comments },
    } = await axios.get(`/api/comments/${postId}`);
    return comments;
};

const addCommentService = async (commentData, postId, token) => {
    const {
        data: { comments },
    } = await axios.post(
        `/api/comments/add/${postId}`,
        { commentData },
        {
            headers: { authorization: token },
        }
    );
    return comments;
};

const editCommentService = async (commentData, postId, commentId, token) => {
    const {
        data: { comments },
    } = await axios.post(
        `/api/comments/edit/${postId}/${commentId}`,
        { commentData },
        {
            headers: { authorization: token },
        }
    );
    return comments;
};

const deleteCommentService = async (commentData, postId, commentId, token) => {
    const {
        data: { comments },
    } = await axios.post(`/api/comments/delete/${postId}/${commentId}`, {
        headers: { authorization: token },
    });
    return comments;
};

export {
    getCommentsService,
    addCommentService,
    editCommentService,
    deleteCommentService,
};
