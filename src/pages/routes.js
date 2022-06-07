import { Routes, Route } from "react-router-dom";
import { Login, Signup, Profile, Setting } from "./index";
import { RequiresAuth } from "./RequiresAuth";
import { useSelector } from "react-redux";

function PageRoutes() {
    const auth = useSelector((state) => state.authReducer);

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
                path="/"
                element={
                    <RequiresAuth>
                        <></>
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
        </Routes>
    );
}

export { PageRoutes };
