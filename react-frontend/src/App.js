import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Landing from './Landing'
import Home from './Home';
import { fakeAuth } from './utils/FakeAuth';

const App = () => {
    const [token, setToken] = useState(null);

    const handleLogin = async () => {
        const token = await fakeAuth();
        setToken(token);
    };
    
    const handleLogout = () =>{
        setToken(null);
    } 
    return( 
    <>
        <Navigation token={token} onLogout={handleLogout}/>

        <h1>React Router</h1>
        <Routes>
            <Route index element={<Home onLogin={handleLogin}/>}/>
            <Route path="home" 
                element={
                        <Home onLogin={handleLogin}/>
                }/>
            <Route path="landing" element={<Landing/>}/>
            <Route path="*" element={<p>There's nothing here: 404</p>}/>
        </Routes>
    </>
    );
};

const Navigation = ({token, onLogout}) =>(
    <nav>
        <Link to="/landing">Landing</Link>
        <Link to="/home">Home</Link>
        { token && (
            <button type="button" onClick={onLogout}>Sign Out</button>
        )

        }
    </nav>
);

export default App;