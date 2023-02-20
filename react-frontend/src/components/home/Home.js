import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
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
    function getToken() {
        var nameEQ = "token=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            
            while (c.charAt(0) === ' '){
                c = c.substring(1,c.length);
            }
            
            if (c.indexOf(nameEQ) === 0){
                return c.substring(nameEQ.length,c.length);
            }
        }
        return null;
    }
    function checkToken(){
        value.setToken(getToken()); 
        return value.token !== null;
    }
    
    return (
    <>    
        <h2>Home (Public)</h2>
        {checkToken() ?
        (<></>) : chooseForm()}
    </>
    );
}

export default Home;