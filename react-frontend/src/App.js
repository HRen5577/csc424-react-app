import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Landing from './Landing'
import Home from './Home';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
    const [user,setUser] = useState();

    const handleLogin = () => setUser({id:"1",name:"bj"});
    const handleLogout = () => setUser(null);

    return( 
    <>
        <Navigation/>
        {user ? (
            <button onClick={handleLogout}>Sign Out</button>
        ) : (
            <button onClick={handleLogin}>Sign In</button>
        )}

        <h1>React Router</h1>
        <Routes>
            <Route index element={<Landing/>}/>
            <Route path="home" 
                element={
                    <ProtectedRoute user={user}>
                        <Home/>
                    </ProtectedRoute>}
                />
            <Route path="landing" element={<Landing/>}/>
            <Route path="*" element={<p>There's nothing here: 404</p>}/>
        </Routes>
    </>
    );
};

const Navigation = () =>(
    <nav>
        <Link to="/landing">Landing</Link>
        <Link to="/home">Home</Link>
    </nav>
);

export default App;