import { useState } from "react";
import { useAuth } from "./context/AuthProvider";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";


const Home = () => {
    const {value} = useAuth();
    const [isLogin, setLogin] = useState(true);

    const chooseForm = () => {
        if(isLogin){
            return (<LoginForm setLogin={setLogin}/>)
        }
        return (<SignupForm setLogin={setLogin}/>)
    }

    return (
    <>    
        <h2>Home (Public)</h2>
        {value.token ?
        (<></>) : chooseForm()}
    </>
    );
}

export default Home;