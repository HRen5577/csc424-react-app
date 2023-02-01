import { useState } from "react";
import { signup } from "./UserFuncions";
import { useAuth } from "./context/AuthProvider";
import "./SignupForm.css";


const SignupForm = () =>{
    const {value} = useAuth();

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    function handleUsernameChange(event){
        setUsername(event.target.value);
    }

    function handlePasswordChange(event){
        setPassword(event.target.value);
    }

    function validatePassword(){
        return true;
    }

    function submitForm(){
        if(validatePassword(password)){
            signup(username,password).then( result => {
                if(result.status === 201 && result.data.token !== undefined){
                    value.onLogin(result.data.token);
                }
                else{
                    console.log(result);
                    alert("Username already taken?!");
                }
            });
        }
        else{
            alert("Invalid Password")
        }
    }

    return(
        <form className="signup">
            <label>Name:</label>
            <input type="text" value={username} 
                onChange={handleUsernameChange} />
            <lablel>Password: </lablel>
            <input type="password" value={password} 
                onChange={handlePasswordChange} />
            <button type="button" value="Submit" onClick={submitForm}>
                Sign Up
            </button>
            <label>Already have an account?<strong onClick={""}>Sign In</strong></label>
        </form>
    )
}

export default SignupForm;