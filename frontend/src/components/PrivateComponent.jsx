import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ children }) {

    const { isAuth } = useSelector(state => state.auth);

    if (!isAuth) {
        
        return <Navigate to="/"  replace />;
    }

    return children; 
}

export default PrivateRoute;