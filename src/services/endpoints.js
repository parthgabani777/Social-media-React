import { config } from "../config/config";

const BASE_URL = config.BASE_URL;

export const authEndpoints = {
    login: `${BASE_URL}/auth/login`,
    signup: `${BASE_URL}/auth/signup`,
};

export const commentEndpoints = {
    getComments: (postId) => `${BASE_URL}/comments/${postId}`,
    addComment: (postId) => `${BASE_URL}/comments/add/${postId}`,
    editComment: (postId, commentId) =>
        `${BASE_URL}/comments/edit/${postId}/${commentId}`,
    deleteComment: (postId, commentId) =>
        `${BASE_URL}/comments/delete/${postId}/${commentId}`,
};

export const postEndpoints = {
    getAllPosts: `${BASE_URL}/posts`,
    getPost: (postId) => `${BASE_URL}/posts/${postId}`,
    getUserPost: (userId) => `${BASE_URL}/posts/user/${userId}`,
    addPost: `${BASE_URL}/posts`,
    deletePost: (postId) => `${BASE_URL}/posts/${postId}`,
    editPost: (postId) => `${BASE_URL}/posts/edit/${postId}`,
    likePost: (postId) => `${BASE_URL}/posts/like/${postId}`,
    dislikePost: (postId) => `${BASE_URL}/posts/dislike/${postId}`,
};

export const userEndpoints = {
    getAllUsers: `${BASE_URL}/users`,
    getUser: (userId) => `${BASE_URL}/users/${userId}`,
    postUserData: `${BASE_URL}/users/edit`,
    getBookmarks: `${BASE_URL}/users/bookmark`,
    addBookmarks: (postId) => `${BASE_URL}/users/bookmark/${postId}`,
    removeBookmark: (postId) => `${BASE_URL}/users/remove-bookmark/${postId}`,
    followUser: (followUserId) => `${BASE_URL}/users/follow/${followUserId}`,
    unfollowUser: (followUserId) =>
        `${BASE_URL}/users/unfollow/${followUserId}`,
};
