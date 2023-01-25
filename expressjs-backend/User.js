
const users = [
    {
        "username":"hr",
        "password":"csc424"
    }
];

function findByUsername(username){
    users.forEach( user => {
        if(user.username == username){
            return user
        }
    });
}

function searchUser(username,password){
    user = users[0];//findByUsername(username);

    if(user !== undefined && user.username === username && user.password === password){
        console.log("foudn");
        return true
    }
    return false;
}



exports.searchUser = searchUser