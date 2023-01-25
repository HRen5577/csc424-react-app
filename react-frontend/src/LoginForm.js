import { useState } from "react";
import { login } from "./UserFuncions";
import { useAuth } from "./context/AuthProvider";
import "./LoginForm.css";


const LoginForm = () =>{
    const {value} = useAuth();

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    function handleUsernameChange(event){
        setUsername(event.target.value);
    }
    function handlePasswordChange(event){
        setPassword(event.target.value);
    }
    function submitForm(){
        login(username,password).then( result => {
            alert(result);

            if(result !== false && result.data.token !== undefined){
                value.onLogin(result.data.token);
            }
            else{
                alert("Wrong password or username");
            }
        });

        // if(fakeUser['username'] === username && fakeUser['password'] === password){
        //     value.onLogin();
        // }
        // else{
        //     alert("Wrong password or username!");
        // }
    }

    return(
        <form className="login">
            <label>Name:</label>
            <input type="text" value={username} 
                onChange={handleUsernameChange} />
            <lablel>Password: </lablel>
            <input type="password" value={password} 
                onChange={handlePasswordChange} />
            <button type="button" value="Submit" onClick={submitForm}>
                Sign In
            </button>

        </form>
    )
}

export default LoginForm;