import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import userReducer from "../slices/userSlice";
import postsReducer from "../slices/postSlice";

const store = configureStore({
  reducer: {
    authReducer,
    userReducer,
    postsReducer,
  },
});

export { store };
