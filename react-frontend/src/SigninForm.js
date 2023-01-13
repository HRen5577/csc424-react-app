import { useState } from "react";
import { useAuth } from "./context/AuthProvider";

const fakeUser = {
    username:"hr",
    password:"csc424"
}

const SigninForm = () =>{
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
        if(fakeUser['username'] === username && fakeUser['password'] === password){
            value.onLogin();
        }
        else{
            alert("Wrong password or username!");
        }
    }

    return(
        <form>
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

export default SigninForm;