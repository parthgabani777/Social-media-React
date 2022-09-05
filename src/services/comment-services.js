import axios from "axios";
import { commentEndpoints } from "./endpoints";

const getCommentsService = (postId) => {
    return axios.get(commentEndpoints.getComments);
};

const addCommentService = (commentData, postId, token) => {
    return axios.post(
        commentEndpoints.addComment(postId),
        { commentData },
        {
            headers: { authorization: token },
        }
    );
};

const editCommentService = (commentData, postId, commentId, token) => {
    return axios.post(
        commentEndpoints.editComment(postId, commentId),
        { commentData },
        {
            headers: { authorization: token },
        }
    );
};

const deleteCommentService = (postId, commentId, token) => {
    return axios.post(commentEndpoints.deleteComment(postId, commentId), {
        headers: { authorization: token },
    });
};

export {
    getCommentsService,
    addCommentService,
    editCommentService,
    deleteCommentService,
};
