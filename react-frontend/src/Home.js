import { useAuth } from "./context/AuthProvider";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const Home = () => {
    const {value} = useAuth();

    return (
    <>    
        <h2>Home (Public)</h2>
        {value.token ?
        (<></>) : (<SignupForm/>)}
    </>
    );
}

export default Home;