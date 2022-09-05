import { Routes, Route } from "react-router-dom";
import {
    Login,
    Signup,
    Profile,
    Setting,
    Home,
    SinglePost,
    SingleUser,
    NotFound,
} from "./index";
import { RequiresAuth } from "./RequiresAuth";
import { useSelector } from "react-redux";
import Mockman from "mockman-js";

function PageRoutes() {
    const auth = useSelector((state) => state.authReducer);

    return (
        <Routes>
            <Route path="/mock" element={<Mockman colorScheme="dark" />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
            <Route
                path="/"
                element={
                    <RequiresAuth>
                        <Home />
                    </RequiresAuth>
                }
            />
            <Route
                path="/explore"
                element={
                    <RequiresAuth>
                        <Home />
                    </RequiresAuth>
                }
            />
            <Route
                path="/profile"
                element={
                    <RequiresAuth>
                        <Profile />
                    </RequiresAuth>
                }
            />
            <Route
                path="/setting"
                element={
                    <RequiresAuth>
                        <Setting />
                    </RequiresAuth>
                }
            />
            <Route
                path="/post/:postId"
                element={
                    <RequiresAuth>
                        <SinglePost />
                    </RequiresAuth>
                }
            />
            <Route
                path="/user/:userId"
                element={
                    <RequiresAuth>
                        <SingleUser />
                    </RequiresAuth>
                }
            />
        </Routes>
    );
}

export { PageRoutes };
