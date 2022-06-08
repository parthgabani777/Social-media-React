import axios from "axios";

const getAllPostsService = async () => {
    const {
        data: { posts },
    } = await axios.get("/api/posts");

    return posts;
};

const getPostService = async (postId) => {
    const {
        data: { post },
    } = await axios.get(`/api/posts/${postId}`);

    return post;
};

const getUserPostsService = async (userId) => {
    const {
        data: { posts },
    } = await axios.get(`/api/posts/user/${userId}`);

    return posts;
};

const addPostService = async (postData, token) => {
    const {
        data: { posts },
    } = await axios.post(
        "/api/posts",
        { postData },
        {
            headers: { authorization: token },
        }
    );

    return posts;
};

const deletePostService = async (postId, token) => {
    const {
        data: { posts },
    } = await axios.delete(`/api/posts/${postId}`, {
        headers: { authorization: token },
    });
    return posts;
};

const editPostService = async (postId, postData, token) => {
    const {
        data: { posts },
    } = await axios.post(
        `/api/posts/edit/${postId}`,
        { postData },
        {
            headers: { authorization: token },
        }
    );
    return posts;
};

const likePostService = async (postId, token) => {
    const {
        data: { posts },
    } = await axios.post(
        `/api/posts/like/${postId}`,
        {},
        {
            headers: { authorization: token },
        }
    );
    return posts;
};

const dislikePostService = async (postId, token) => {
    const {
        data: { posts },
    } = await axios.post(
        `/api/posts/dislike/${postId}`,
        {},
        {
            headers: { authorization: token },
        }
    );
    return posts;
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
