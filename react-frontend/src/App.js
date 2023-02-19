import { createContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useAuth } from './context/AuthProvider';
import { AuthProvider } from './context/AuthProvider';
import Landing from './Landing'
import Home from './Home';
import ProtectedRoute from './utils/ProtectedRoute';


export const AuthContext = createContext(null);

const App = () => {
 
    return( 
    <AuthProvider>
        <Navigation/>
          
        <h1>React Router</h1>
        
        <Routes>
            <Route index element={<Home/>}/>

            <Route path="landing" element={
                <ProtectedRoute>    
                    <Landing/>
                </ProtectedRoute>
            }/>
            
            <Route path="home" element={<Home/>}/>
            <Route path="*" element={<p>There's nothing here: 404</p>}/>
        </Routes>
    </AuthProvider>
    );
};

const Navigation = () => {
 const {value} = useAuth();

 function getToken() {
    var nameEQ = "token=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        
        while (c.charAt(0)==' '){
             c = c.substring(1,c.length);
        }
        
        if (c.indexOf(nameEQ) == 0){
            return c.substring(nameEQ.length,c.length);
        }
    }
    return null;
}

 return(   
    <nav>
        <Link to="/landing">Landing</Link>
        <Link to="/home">Home</Link>
        {value.token && (
            <button type="button" onClick={value.onLogout}>Sign Out</button>
        )}    
        </nav>
    );
};

export default App;