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
    async ({ userData, token }, { rejectWithValue }) => {
        try {
            const user = await postUserDataService(userData, token);
            return user;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getAllUsers = createAsyncThunk("user/getAllUsers", async () => {
    const users = await getAllUsersService();
    return users;
});

export const getUserPosts = createAsyncThunk(
    "auth/getUserPosts",
    async ({ userId }) => {
        const userPosts = await getUserPostsService(userId);
        return userPosts;
    }
);

export const followUser = createAsyncThunk(
    "user/followUser",
    async ({ followUserId, token }) => {
        const { user, followUser } = await followUserService(
            followUserId,
            token
        );
        const users = await getAllUsersService();
        return { user, followUser, allUser: users };
    }
);

export const unfollowUser = createAsyncThunk(
    "user/unfollowUser",
    async ({ followUserId, token }) => {
        const { user, followUser } = await unfollowUserService(
            followUserId,
            token
        );
        const users = await getAllUsersService();
        return { user, followUser, allUser: users };
    }
);

export const addBookmark = createAsyncThunk(
    "posts/addBookmark",
    async ({ postId, token }, { rejectWithValue }) => {
        try {
            return await addBookmarkService(postId, token);
        } catch (error) {
            console.log(error);
            return rejectWithValue(error);
        }
    }
);

export const removeBookmark = createAsyncThunk(
    "posts/removeBookmark",
    async ({ postId, token }, { rejectWithValue }) => {
        try {
            return await removeBookmarkService(postId, token);
        } catch (error) {
            console.log(error);
            return rejectWithValue(error);
        }
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: {
        [login.fulfilled]: (
            state,
            {
                payload: {
                    auth: { foundUser },
                },
            }
        ) => {
            state.loggedInUser = foundUser;
        },
        [signup.fulfilled]: (state, { payload: { createdUser } }) => {
            state.loggedInUser = createdUser;
        },
        [getAllUsers.fulfilled]: (state, { payload }) => {
            state.allUser = payload;
        },
        [addBookmark.fulfilled]: (state, { payload }) => {
            state.loggedInUser.bookmarks = payload;
        },
        [removeBookmark.fulfilled]: (state, { payload }) => {
            state.loggedInUser.bookmarks = payload;
        },

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

        [getUserPosts.fulfilled]: (state, { payload }) => {
            state.userPosts = payload;
        },

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

        [followUser.fulfilled]: (state, { payload }) => {
            state.userData = payload.followUser;
            state.loggedInUser = payload.user;
            state.allUser = payload.allUser;
        },
        [unfollowUser.fulfilled]: (state, { payload }) => {
            state.userData = payload.followUser;
            state.loggedInUser = payload.user;
            state.allUser = payload.allUser;
        },
    },
});

export default userSlice.reducer;
