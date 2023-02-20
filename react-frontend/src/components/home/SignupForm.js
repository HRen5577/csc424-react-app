import { useState } from "react";
import { signup } from "../../utils/UserFunctions";
import { useAuth } from "../../context/AuthProvider";
import "./styles/SignupForm.css";


const SignupForm = (props) =>{
    const {value} = useAuth();

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    function handleUsernameChange(event){
        setUsername(event.target.value);
    }

    function handlePasswordChange(event){
        setPassword(event.target.value);
    }

    function handleConfirmPasswordChange(event){
        setConfirmPassword(event.target.value);
    }
    
    function handlePhoneNumberChange(event){
        setPhoneNumber(event.target.value);
    }

    function validPhone(){ 
        const rightFormat = () =>{
            return phoneNumber[3] === "-" && phoneNumber[7] === "-"; 
        }

        let numString = phoneNumber.slice(0,3) + phoneNumber.slice(4,7) + phoneNumber.slice(8);

        if(numString.length === 10 && rightFormat()){
            for(let i = 0; i < numString.length; i++){
                if(isNaN(parseInt(numString[i]))){
                    return false;
                }
            }
            return true
        }
        return false;
    }

    function validatePassword(){
        let myRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{1,}$");
        return myRegex.test(password) && (password === confirmPassword) && validPhone(); 
    }

    function submitForm(){
        if(validatePassword(password)){
            let user = {
                username:username,
                password:password,
                phoneNumber:phoneNumber
            }
            signup(user).then( result => {
                if(result.status === 201 && result.data !== undefined){
                    value.onLogin(result.data);
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
            <label>Name: </label>
            <input type="text" value={username} 
                onChange={handleUsernameChange} />
            
            <label>Password: </label>
            <input type="password" value={password} 
                onChange={handlePasswordChange} />
            
            <label>Confirm Password: </label>
            <input type="password" value={confirmPassword} 
                onChange={handleConfirmPasswordChange} />
            
            <label>Phone number: </label>
            <input type="tel"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}/>

            <button type="button" value="Submit" onClick={submitForm}>Sign Up</button>
            <label onClick={() => props.setLogin(true)}>Already have an account? <strong>Sign In!</strong></label>            

        </form>
    )
}

export default SignupForm;