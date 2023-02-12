const mongoose = require("mongoose");
const userModel = require("./user");
mongoose.set("debug",true);
mongoose.set('strictQuery',false)

mongoose.connect("mongodb://127.0.0.1:27017/users",{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).catch((error) => console.log(error));


async function checkUsernameExists(username) {
    return (await userModel.find({ username: username }))[0] !== undefined;
}

async function checkLogin(username, password) {
    return (await userModel.find({ username: username, password:password }))[0];
}

async function findUserById(id) {
    try {
        return await userModel.findById(id);
    } catch (error) {
        console.log(error);
        return undefined;
    }
    }
    
async function getUser(username) {
    return (await userModel.find({ username: username}))[0];
}


async function getAllUsers() {
    return await userModel.find();
}



async function addUser(user) {
try {
    const userToAdd = new userModel(user);
    const savedUser = await userToAdd.save();
    return savedUser;
} catch (error) {
    console.log(error);
    return false;
}
}

async function deleteUser(username) {
    return await userModel.findOneAndDelete({username:username});
}



exports.getUser = getUser;
exports.getAllUsers = getAllUsers;
exports.checkLogin = checkLogin;
exports.getAllUsers = getAllUsers
exports.findUserById = findUserById;
exports.checkUsernameExists = checkUsernameExists
exports.addUser = addUser;
exports.deleteUser = deleteUser;