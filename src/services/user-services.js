import axios from "axios";
import { userEndpoints } from "./endpoints";

const getAllUsersService = () => {
    return axios.get(userEndpoints.getAllUsers);
};

const getUserService = (userId) => {
    return axios.get(userEndpoints.getUser(userId));
};

const postUserDataService = (userData, token) => {
    return axios.post(
        userEndpoints.postUserData,
        { userData },
        {
            headers: { authorization: token },
        }
    );
};

const getBookmarksService = (token) => {
    return axios.get(
        userEndpoints.getBookmarks,
        {},
        {
            headers: { authorization: token },
        }
    );
};

const addBookmarkService = (postId, token) => {
    return axios.post(
        userEndpoints.addBookmarks(postId),
        {},
        {
            headers: { authorization: token },
        }
    );
};

const removeBookmarkService = (postId, token) => {
    return axios.post(
        userEndpoints.removeBookmark(postId),
        {},
        {
            headers: { authorization: token },
        }
    );
};

const followUserService = (followUserId, token) => {
    return axios.post(
        userEndpoints.followUser(followUserId),
        {},
        {
            headers: { authorization: token },
        }
    );
};

const unfollowUserService = (followUserId, token) => {
    return axios.post(
        userEndpoints.unfollowUser(followUserId),
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
