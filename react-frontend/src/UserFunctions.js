import axios from 'axios';


export async function login(un, pas) {
    try {
      //const config = { headers: { authorization: `Bearer ${user.auth_token}` } };
      return await axios.post("https://localhost:5000/account/login",
      { username: un,
        password: pas
      });
    } catch (error) {
      //console.log(error);
      return false;
    }
  }

  export async function signup(un, pas) {
    try {
      //const config = { headers: { authorization: `Bearer ${user.auth_token}` } };
      return await axios.post("https://localhost:5000/account/register",
      { username: un,
        password: pas
      });
    } catch (error) {
      //console.log(error);
      return false;
    }
  }
  
  export async function getContacts(un) {
    try {
      //const config = { headers: { authorization: `Bearer ${user.auth_token}` } };
      return await axios.get("https://localhost:5000/contacts");
    } catch (error) {
      //console.log(error);
      return false;
    }
  }
  