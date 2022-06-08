import axios from "axios";

const getAllUsersService = async () => {
    const {
        data: { users },
    } = await axios.get("/api/users");
    return users;
};

const getUserService = async (userId) => {
    const {
        data: { user },
    } = await axios.get(`/api/users/${userId}`);
    return user;
};

const postUserDataService = async (userData, token) => {
    const {
        data: { user },
    } = await axios.post(
        "/api/users/edit",
        { userData },
        {
            headers: { authorization: token },
        }
    );
    return user;
};

const getBookmarksService = async (token) => {
    const {
        data: { bookmarks },
    } = await axios.get(
        "/api/users/bookmark",
        {},
        {
            headers: { authorization: token },
        }
    );
    return bookmarks;
};

const addBookmarkService = async (postId, token) => {
    const {
        data: { bookmarks },
    } = await axios.post(
        `/api/users/bookmark/${postId}`,
        {},
        {
            headers: { authorization: token },
        }
    );
    return bookmarks;
};

const removeBookmarkService = async (postId, token) => {
    const {
        data: { bookmarks },
    } = await axios.post(
        `/api/users/remove-bookmark/${postId}`,
        {},
        {
            headers: { authorization: token },
        }
    );
    return bookmarks;
};

const followUserService = async (followUserId, token) => {
    const {
        data: { user, followUser },
    } = await axios.post(
        `/api/users/follow/${followUserId}`,
        {},
        {
            headers: { authorization: token },
        }
    );
    return { user, followUser };
};

const unfollowUserService = async (followUserId, token) => {
    const {
        data: { user, followUser },
    } = await axios.post(
        `/api/users/unfollow/${followUserId}`,
        {},
        {
            headers: { authorization: token },
        }
    );
    return { user, followUser };
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
