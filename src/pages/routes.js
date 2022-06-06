import { Routes, Route } from "react-router-dom";
import { Login, Signup } from "./index";
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
        </Routes>
    );
}

export { PageRoutes };
