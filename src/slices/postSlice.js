import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    addCommentService,
    getCommentsService,
} from "../services/comment-services";
import {
    addPostService,
    deletePostService,
    dislikePostService,
    editPostService,
    getAllPostsService,
    getPostService,
    likePostService,
} from "../services/post-services";

const initialState = {
    posts: [],
    isLoading: false,
    currentPost: null,
};

export const getAllPosts = createAsyncThunk("posts/getAllPosts", async () => {
    const response = await getAllPostsService();
    const {
        data: { posts },
    } = response;
    return posts;
});

export const getPost = createAsyncThunk("posts/getPost", async (postId) => {
    const response = await getPostService(postId);
    const {
        data: { post },
    } = response;
    return post;
});

export const addPost = createAsyncThunk(
    "posts/addPost",
    async ({ postData, token }) => {
        const response = await addPostService(postData, token);
        const {
            data: { posts },
        } = response;
        return posts;
    }
);

export const editPost = createAsyncThunk(
    "posts/editPost",
    async ({ postId, postData, token }) => {
        const response = await editPostService(postId, postData, token);
        const {
            data: { posts },
        } = response;
        return posts;
    }
);

export const deletePost = createAsyncThunk(
    "posts/deletePost",
    async ({ postId, token }) => {
        const response = await deletePostService(postId, token);
        const {
            data: { posts },
        } = response;
        return posts;
    }
);

export const getComments = createAsyncThunk(
    "posts/getComments",
    async (postId) => {
        const response = await getCommentsService(postId);
        const {
            data: { comments },
        } = response;
        return comments;
    }
);

export const addComment = createAsyncThunk(
    "posts/addComment",
    async ({ commentData, postId, token }) => {
        const response = await addCommentService(commentData, postId, token);
        const {
            data: { comments },
        } = response;
        return { postId, comments };
    }
);

export const likePost = createAsyncThunk(
    "posts/likePost",
    async ({ postId, token }) => {
        const response = await likePostService(postId, token);
        const {
            data: { posts },
        } = response;
        return { postId, posts };
    }
);

export const dislikePost = createAsyncThunk(
    "posts/dislikePost",
    async ({ postId, token }) => {
        const response = await dislikePostService(postId, token);
        const {
            data: { posts },
        } = response;
        return { postId, posts };
    }
);

export const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        startLoader: (state) => {
            state.isLoading = true;
        },
        endLoader: (state) => {
            state.isLoading = false;
        },
    },
    extraReducers: {
        [getAllPosts.pending]: (state) => {
            state.isLoading = true;
        },
        [getAllPosts.fulfilled]: (state, { payload }) => {
            state.posts = payload;
            state.isLoading = false;
        },
        [getAllPosts.rejected]: (state) => {
            state.isLoading = false;
        },
        [getComments.pending]: (state) => {
            state.isLoading = true;
        },

        [getPost.pending]: (state) => {
            state.isLoading = true;
        },
        [getPost.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.currentPost = payload;
        },
        [getPost.rejected]: (state) => {
            state.isLoading = false;
        },
        [addPost.fulfilled]: (state, { payload }) => {
            state.posts = payload;
        },

        [editPost.fulfilled]: (state, { payload }) => {
            state.posts = payload;
        },

        [deletePost.fulfilled]: (state, { payload }) => {
            state.posts = payload;
        },

        [addComment.pending]: (state) => {
            //state.isLoading = true;
        },
        [addComment.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            const { comments, postId } = payload;
            const postIndex = state.posts.findIndex(
                (post) => post._id === postId
            );
            state.posts[postIndex].comments = comments;
            state.currentPost.comments = comments;
        },

        [likePost.fulfilled]: (state, { payload }) => {
            const { postId, posts } = payload;
            state.posts = posts;
            const post = posts.find((post) => post._id === postId);
            state.currentPost = post;
        },
        [dislikePost.fulfilled]: (state, { payload }) => {
            const { postId, posts } = payload;
            state.posts = posts;
            const post = posts.find((post) => post._id === postId);
            state.currentPost = post;
        },
    },
});

export const { startLoader, endLoader } = postSlice.actions;

export default postSlice.reducer;
