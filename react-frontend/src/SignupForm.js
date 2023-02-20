import { useState } from "react";
import { signup } from "./UserFunctions";
import { useAuth } from "./context/AuthProvider";
import "./SignupForm.css";


const SignupForm = (props) =>{
    const {value} = useAuth();

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    function handleUsernameChange(event){
        setUsername(event.target.value);
    }

    function handlePasswordChange(event){
        setPassword(event.target.value);
    }

    function handleConfirmPasswordChange(event){
        setConfirmPassword(event.target.value);
    }


    function validatePassword(){
        let myRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{1,}$");
        return myRegex.test(password) && (password === confirmPassword); 
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
            alert("Invalid Password!\nPassword must have an uppercase, a lowercase a symbol and a number!")
        }
    }

    return(
        <form className="signup">
            <label><h1>Signup Form</h1></label>
            <label>Name:</label>
            <input type="text" value={username} 
                onChange={handleUsernameChange} />
            
            <lablel>Password: </lablel>
            <input type="password" value={password} 
                onChange={handlePasswordChange} />
            
            <lablel>Confirm Password: </lablel>
            <input type="password" value={confirmPassword} 
                onChange={handleConfirmPasswordChange} />
            <button type="button" value="Submit" onClick={submitForm}>Sign Up</button>
            <label onClick={() => props.setLogin(true)}>Already have an account? <strong>Sign In!</strong></label>            

        </form>
    )
}

export default SignupForm;