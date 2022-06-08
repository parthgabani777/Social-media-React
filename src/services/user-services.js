import axios from "axios";

const getAllUsersService = () => {
    return axios.get("/api/users");
};

const getUserService = (userId) => {
    return axios.get(`/api/users/${userId}`);
};

const postUserDataService = (userData, token) => {
    return axios.post(
        "/api/users/edit",
        { userData },
        {
            headers: { authorization: token },
        }
    );
};

const getBookmarksService = (token) => {
    return axios.get(
        "/api/users/bookmark",
        {},
        {
            headers: { authorization: token },
        }
    );
};

const addBookmarkService = (postId, token) => {
    return axios.post(
        `/api/users/bookmark/${postId}`,
        {},
        {
            headers: { authorization: token },
        }
    );
};

const removeBookmarkService = (postId, token) => {
    return axios.post(
        `/api/users/remove-bookmark/${postId}`,
        {},
        {
            headers: { authorization: token },
        }
    );
};

const followUserService = (followUserId, token) => {
    return axios.post(
        `/api/users/follow/${followUserId}`,
        {},
        {
            headers: { authorization: token },
        }
    );
};

const unfollowUserService = (followUserId, token) => {
    return axios.post(
        `/api/users/unfollow/${followUserId}`,
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
