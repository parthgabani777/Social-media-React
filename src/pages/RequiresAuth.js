import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";

const RequiresAuth = ({ children }) => {
    const { isAuthorized } = useSelector((state) => state.authReducer);
    const location = useLocation();

    return isAuthorized ? (
        children
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export { RequiresAuth };
