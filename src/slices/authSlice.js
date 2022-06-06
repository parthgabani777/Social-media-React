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
        const auth = await loginUserService(loginCredentials); //pending,fulfilled,rejected
        return { auth };
    }
);

export const signup = createAsyncThunk(
    "auth/signup",
    async ({ signupCredentials }) => {
        const auth = await signupUserService(signupCredentials);
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
        [login.pending]: (state, action) => {
            state.isLoading = true;
        },
        [login.fulfilled]: (
            state,
            {
                payload: {
                    auth: { encodedToken },
                },
            }
        ) => {
            localStorage.setItem("token", encodedToken);
            state.isAuthorized = true;
            state.token = encodedToken;
            state.isLoading = false;
        },
        [login.rejected]: (state, action) => {
            state.isLoading = false;
        },

        [signup.fulfilled]: (
            state,
            { payload: { encodedToken, createdUser } }
        ) => {
            localStorage.setItem("token", encodedToken);
            state.isAuthorized = true;
            state.token = encodedToken;
            state.user = createdUser;
        },
    },
});

export const { signout } = authSlice.actions;

export default authSlice.reducer;
