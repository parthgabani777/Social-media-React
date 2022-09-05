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
    error: "",
};

export const getUserData = createAsyncThunk(
    "user/getUserData",
    async ({ userId }) => {
        const userResponse = await getUserService(userId);
        const {
            data: { user },
        } = userResponse;
        const userPostsResponse = await getUserPostsService(userId);
        const {
            data: { posts: userPosts },
        } = userPostsResponse;
        return { user, userPosts };
    }
);

export const postUserData = createAsyncThunk(
    "user/postUserData",
    async ({ userData, token }) => {
        const response = await postUserDataService(userData, token);
        const {
            data: { user },
        } = response;
        return user;
    }
);

export const getAllUsers = createAsyncThunk("user/getAllUsers", async () => {
    const response = await getAllUsersService();
    const {
        data: { users },
    } = response;
    return users;
});

export const getUserPosts = createAsyncThunk(
    "user/getUserPosts",
    async ({ userId }) => {
        const response = await getUserPostsService(userId);
        const {
            data: { posts },
        } = response;
        return posts;
    }
);

export const addBookmark = createAsyncThunk(
    "user/addBookmark",
    async ({ postId, token }) => {
        const response = await addBookmarkService(postId, token);
        const {
            data: { bookmarks },
        } = response;
        return bookmarks;
    }
);

export const removeBookmark = createAsyncThunk(
    "user/removeBookmark",
    async ({ postId, token }) => {
        const response = await removeBookmarkService(postId, token);
        const {
            data: { bookmarks },
        } = response;
        return bookmarks;
    }
);

export const followUser = createAsyncThunk(
    "user/followUser",
    async ({ followUserId, token }, { rejectWithValue }) => {
        try {
            const followUserResponse = await followUserService(
                followUserId,
                token
            );
            const {
                data: { user, followUser },
            } = followUserResponse;
            const allUserResonse = await getAllUsersService();
            const {
                data: { users },
            } = allUserResonse;
            return { user, followUser, allUser: users };
        } catch (error) {
            if (error.response.status === 400) {
                return rejectWithValue("User Already following");
            }
            return rejectWithValue("Server error.");
        }
    }
);

export const unfollowUser = createAsyncThunk(
    "user/unfollowUser",
    async ({ followUserId, token }) => {
        try {
            const unfollowUserResponse = await unfollowUserService(
                followUserId,
                token
            );
            const {
                data: { user, followUser },
            } = unfollowUserResponse;
            const allUserResonse = await getAllUsersService();
            const {
                data: { users },
            } = allUserResonse;
            return { user, followUser, allUser: users };
        } catch (error) {
            if (error.response.status === 400) {
                return rejectWithValue("User already Not following");
            }
            return rejectWithValue("Server error.");
        }
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: {
        [login.fulfilled]: (state, { payload: { foundUser } }) => {
            console.log(foundUser);
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
        [getUserPosts.pending]: (state) => {
            state.isLoading = true;
        },
        [getUserPosts.fulfilled]: (state, { payload }) => {
            state.userPosts = payload;
            state.isLoading = false;
        },
        [getUserData.rejected]: (state) => {
            state.isLoading = false;
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

        // follow/unfollow user
        [followUser.fulfilled]: (state, { payload }) => {
            state.userData = payload.followUser;
            state.loggedInUser = payload.user;
            state.allUser = payload.allUser;
        },
        [followUser.rejected]: (state, { payload }) => {
            state.error = payload;
        },
        [unfollowUser.fulfilled]: (state, { payload }) => {
            state.userData = payload.followUser;
            state.loggedInUser = payload.user;
            state.allUser = payload.allUser;
        },
        [unfollowUser.rejected]: (state, { payload }) => {
            state.error = payload;
        },
    },
});

export default userSlice.reducer;
