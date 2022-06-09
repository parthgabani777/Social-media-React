import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUserService, signupUserService } from "../services/auth-services";

const initialState = {
    isAuthorized: false,
    token: null,
    isLoading: false,
    error: "",
};

export const login = createAsyncThunk(
    "auth/login",
    async ({ loginCredentials }, { rejectWithValue }) => {
        try {
            const response = await loginUserService(loginCredentials);
            const { data: auth } = response;
            return auth;
        } catch (error) {
            switch (error.response.status) {
                case 401:
                    return rejectWithValue("Wrong password.");
                case 404:
                    return rejectWithValue("Username not found.");
                default:
                    return rejectWithValue("Login failed.");
            }
        }
    }
);

export const signup = createAsyncThunk(
    "auth/signup",
    async ({ signupCredentials }, { rejectWithValue }) => {
        try {
            const response = await signupUserService(signupCredentials);
            const { data: auth } = response;
            return auth;
        } catch (error) {
            switch (error.response.status) {
                case 422:
                    return rejectWithValue("Username alrady exists.");
                default:
                    return rejectWithValue("Signup failed.");
            }
        }
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
        [login.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
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
        [signup.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
    },
});

export const { signout } = authSlice.actions;

export default authSlice.reducer;
