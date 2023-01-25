
const users = [
    {
        "username":"hr",
        "password":"csc424"
    }
];


function searchUser(username,password){
    usersFiltered = users.filter( (user) =>  user.username == username && user.password == password)[0];

    if(usersFiltered !== undefined){
        return true;
    }
    return false;
}



exports.searchUser = searchUser