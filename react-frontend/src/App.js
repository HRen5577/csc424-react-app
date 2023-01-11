import { Routes, Route, Link } from 'react-router-dom';
import Landing from './Landing'
import Home from './Home';

const App = () => {
    return( 
    <>
        <Navigation/>
        <h1>React Router</h1>
        <Routes>
            <Route index element={<Landing/>}/>
            <Route path="landing" element={<Landing/>}/>
            <Route path="home" element={<Home/>}/>
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