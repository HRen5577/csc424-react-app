import { useState } from "react";
import { login } from "./UserFuncions";
import { useAuth } from "./context/AuthProvider";
import "./LoginForm.css";


const LoginForm = (props) =>{
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
            if(result.status === 201 && result.data.token !== undefined){
                value.onLogin(result.data.token);
            }
            else{
                console.log(result);
                alert("Wrong password or username");
            }
        });
    }

    return(
        <form className="login">
            <label><h1>Login Form</h1></label>
            <label>Name:</label>
            <input type="text" value={username} 
                onChange={handleUsernameChange} />
            <lablel>Password: </lablel>
            <input type="password" value={password} 
                onChange={handlePasswordChange} />
            <button type="button" value="Submit" onClick={submitForm}>Sign In</button>
            <button type="button" onClick={() => props.isLogin(false)}>Sign Up</button>            

        </form>
    )
}

export default LoginForm;