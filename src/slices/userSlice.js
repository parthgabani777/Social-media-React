import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserPostsService } from "../services/post-services";
import {
    addBookmarkService,
    followUserService,
    getAllUsersService,
    getUserService,
    postUserDataService,
    removeBookmarkService,
    unfollowUserService,
} from "../services/user-services";
import { login, signup } from "./authSlice";

const initialState = {
    loggedInUser: null,
    allUser: null,
    userData: null,
    userPosts: null,
    isLoading: false,
};

export const getUserData = createAsyncThunk(
    "user/getUserData",
    async ({ userId }) => {
        const user = await getUserService(userId);
        const userPosts = await getUserPostsService(userId);
        return { user, userPosts };
    }
);

export const postUserData = createAsyncThunk(
    "user/postUserData",
    async ({ userData, token }) => {
        const user = await postUserDataService(userData, token);
        return user;
    }
);

export const getAllUsers = createAsyncThunk("user/getAllUsers", async () => {
    const users = await getAllUsersService();
    return users;
});

export const getUserPosts = createAsyncThunk(
    "user/getUserPosts",
    async ({ userId }) => {
        const userPosts = await getUserPostsService(userId);
        return userPosts;
    }
);

export const addBookmark = createAsyncThunk(
    "posts/addBookmark",
    async ({ postId, token }) => {
        const bookmarks = await addBookmarkService(postId, token);
        return bookmarks;
    }
);

export const removeBookmark = createAsyncThunk(
    "posts/removeBookmark",
    async ({ postId, token }) => {
        const bookmarks = await removeBookmarkService(postId, token);
        return bookmarks;
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: {
        [login.fulfilled]: (state, { payload: { foundUser } }) => {
            state.loggedInUser = foundUser;
        },
        [signup.fulfilled]: (state, { payload: { createdUser } }) => {
            state.loggedInUser = createdUser;
        },
        [getAllUsers.fulfilled]: (state, { payload }) => {
            state.allUser = payload;
        },

        // edit user data
        [postUserData.pending]: (state) => {
            state.isLoading = true;
        },
        [postUserData.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.loggedInUser = payload;
        },
        [postUserData.rejected]: (state) => {
            state.isLoading = false;
        },

        // get user post
        [getUserPosts.fulfilled]: (state, { payload }) => {
            state.userPosts = payload;
        },

        // get user data
        [getUserData.pending]: (state) => {
            state.isLoading = true;
        },
        [getUserData.fulfilled]: (state, { payload }) => {
            state.userData = payload.user;
            state.userPosts = payload.userPosts;
            state.isLoading = false;
        },
        [getUserData.rejected]: (state) => {
            state.isLoading = false;
        },

        // add/remove Bookmark
        [addBookmark.fulfilled]: (state, { payload }) => {
            state.loggedInUser.bookmarks = payload;
        },
        [removeBookmark.fulfilled]: (state, { payload }) => {
            state.loggedInUser.bookmarks = payload;
        },
    },
});

export default userSlice.reducer;
