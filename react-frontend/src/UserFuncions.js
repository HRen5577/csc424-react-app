import axios from 'axios';


export async function login(un, pas) {
    try {
      //const config = { headers: { authorization: `Bearer ${user.auth_token}` } };
      return await axios.post("http://localhost:5000/account/login",
      { username: un,
        password: pas
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  