import { useAuth } from "./context/AuthProvider";
import SigninForm from "./SigninForm";

const Home = () => {
    const {value} = useAuth();

    return (
    <>    
        <h2>Home (Public)</h2>
        {value.token ?
        (<></>) : (<SigninForm/>)}
    </>
    );
}

export default Home;