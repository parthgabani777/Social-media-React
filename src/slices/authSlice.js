import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUserService, signupUserService } from "../services/auth-services";

const initialState = {
    isAuthorized: false,
    token: null,
    isLoading: false,
};

export const login = createAsyncThunk(
    "auth/login",
    async ({ loginCredentials }) => {
        const response = await loginUserService(loginCredentials);
        const { data: auth } = response;
        return auth;
    }
);

export const signup = createAsyncThunk(
    "auth/signup",
    async ({ signupCredentials }) => {
        const response = await signupUserService(signupCredentials);
        const { data: auth } = response;
        return auth;
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signout: (state) => {
            localStorage.removeItem("token");
            state.isAuthorized = false;
            state.token = null;
        },
    },
    extraReducers: {
        [login.pending]: (state) => {
            state.isLoading = true;
        },
        [login.fulfilled]: (state, { payload: { encodedToken } }) => {
            localStorage.setItem("token", encodedToken);
            state.isAuthorized = true;
            state.token = encodedToken;
            state.isLoading = false;
        },
        [login.rejected]: (state) => {
            state.isLoading = false;
        },

        [signup.pending]: (state) => {
            state.isLoading = true;
        },
        [signup.fulfilled]: (state, { payload: { encodedToken } }) => {
            localStorage.setItem("token", encodedToken);
            state.isAuthorized = true;
            state.token = encodedToken;
            state.isLoading = false;
        },
        [signup.rejected]: (state) => {
            state.isLoading = false;
        },
    },
});

export const { signout } = authSlice.actions;

export default authSlice.reducer;
