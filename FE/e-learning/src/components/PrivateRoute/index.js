import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
    const user = useSelector((state) => state.user.currentUser);

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;
