import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const navigate = useNavigate();

    const [token,setToken] = useState(null);

    const handleLogin = async (token) => {
        setToken(token);
        document.cookie = `token=${token}`;
        navigate("/landing");
    };

    const handleLogout = () => {
        setToken(null);
        document.cookie = `token=;Max-Age=-99999999;`;
    };

    const value = {
        token,
        setToken,
        onLogin: handleLogin,
        onLogout: handleLogout,
    };

    return(
        <AuthContext.Provider value={{value}}>
            {children}
        </AuthContext.Provider>
    );
};

// give callers accesss to the context
export const useAuth = () => useContext(AuthContext);