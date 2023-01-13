import {Navigate} from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const ProtectedRoute = ({ children }) => {
    const {value} = useAuth();

    if(!value.token){
        return <Navigate to="/home" replace/>;
    }
    return children;
};

export default ProtectedRoute;