const https = require("https");
const fs = require("fs");

const express = require('express');
const cors = require("cors");

const userServices = require('./models/user-services');
const jwtServices = require('./models/jwt-services');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

https.createServer(
        {
            key:  fs.readFileSync("./cert/key.pem"),
            cert: fs.readFileSync("./cert/cert.pem"),
        },
        app
    )
    .listen(port, () => {
        console.log(`Example app listening at https//localhost:${port}`);
    });

app.get('/', (req, res)=>{
    res.send("Hello World");
});


app.get('/account', async (req, res) => {
    res.status(201).send( await userServices.getAllUsers());
})

app.get('/account/:username', async (req, res) => {
    let username = req.params["username"];
    if(username){
        res.status(200).send(await userServices.getUser(username))
    }
    else{
        res.status(404).end("User not found!")
    }
})

app.get('/contacts', async (req,res) =>{
    var allUsersInformation = await userServices.getAllUsers();
    var allUsers = allUsersInformation.map(user => {
        return {name: user.username}
    })
    return res.status(200).send(allUsers);
})

app.delete('/account/:username', async (req, res) => {
    let username = req.params["username"];
    if(username){
        const userDeleted = await userServices.deleteUser(username)
        res.status(200).send(userDeleted);
    }
    else{
        res.status(404).end("No username given")
    }
})

app.post('/account/register', async (req, res) => {
    var userToAdd = req.body;
    const userFound = await userServices.checkUsernameExists(userToAdd.username);

    if(userFound !== true){
        userToAdd.token = jwtServices.generateAccessToken(userToAdd.username);
        const savedUser = await userServices.addUser(userToAdd);
        res.status(201).send(savedUser);
    }
    else{
        res.status(403).end();
    }
})

app.post('/account/login', async (req,res) => {
    var userToLogin = req.body;
    const userFound = await userServices.checkLogin(userToLogin.username, userToLogin.password);
    console.log(userFound)
    if(userFound !== undefined){
        res.status(201).send(userFound);
    }else{
        res.status(403).end();
    }
});



