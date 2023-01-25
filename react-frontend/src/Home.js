import { useAuth } from "./context/AuthProvider";
import LoginForm from "./LoginForm";

const Home = () => {
    const {value} = useAuth();

    return (
    <>    
        <h2>Home (Public)</h2>
        {value.token ?
        (<></>) : (<LoginForm/>)}
    </>
    );
}

export default Home;