let users = [
    {
        "username":"hr",
        "password":"csc424"
    }
];

function getUsers(){
    return users;
}
function getUser(username){
    return users.filter( (user) => user.username == username)[0];
}
function addUser(user){
    users.push(user);
}

function searchUsername(username){
    return getUser(username) !== undefined;
}


function searchUser(username,password){
    return users.filter( (user) =>  user.username == username && user.password == password)[0] != undefined;
}

exports.searchUser = searchUser;
exports.searchUsername = searchUsername;
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.addUser = addUser;