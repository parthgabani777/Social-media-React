import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { toast } from "react-toastify";

const RequiresAuth = ({ children }) => {
    const { isAuthorized } = useSelector((state) => state.authReducer);
    const location = useLocation();

    useEffect(() => {
        if (!isAuthorized) {
            toast.dismiss();
            toast.error("Login first");
        }
    });

    return isAuthorized ? (
        children
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export { RequiresAuth };
