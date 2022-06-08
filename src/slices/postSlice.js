import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    getAllPostsService,
} from "../services/post-services";

const initialState = {
    posts: [],
    isLoading: false,
    currentPost: null,
};

export const getAllPosts = createAsyncThunk("posts/getAllPosts", async () => {
    const posts = await getAllPostsService();
    return posts;
});

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
    },
});

export const { startLoader, endLoader } = postSlice.actions;

export default postSlice.reducer;
