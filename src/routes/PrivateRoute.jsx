import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/shared/LoadinSpinner";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    console.log(loading)

    if (loading) return <LoadingSpinner />
    if (!user) return <Navigate to="/login" state={{ from: location?.pathname }} replace></Navigate>
    return children
};

export default PrivateRoute;