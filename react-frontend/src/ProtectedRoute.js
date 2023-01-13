import {Navigate} from "react-router-dom";
const ProtectedRoute = ({ user,children }) => {
    if(!user){
        return <Navigate to="/landing" repalce/>;
    }
    return children;
};

export default ProtectedRoute;