import axios from 'axios';


export async function login(user) {
    try {
      //const config = { headers: { authorization: `Bearer ${user.auth_token}` } };
      return await axios.post("https://localhost:5000/account/login",user);
    } catch (error) {
      //console.log(error);
      return false;
    }
  }

  export async function signup(user) {
    try {
      //const config = { headers: { authorization: `Bearer ${user.auth_token}` } };
      return await axios.post("https://localhost:5000/account/register",user);
    } catch (error) {
      //console.log(error);
      return false;
    }
  }
  
  export async function getContacts() {
    try {
      //const config = { headers: { authorization: `Bearer ${user.auth_token}` } };
      return await axios.get("https://localhost:5000/contacts");
    } catch (error) {
      //console.log(error);
      return false;
    }
  }
  