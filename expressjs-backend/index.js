const https = require("https");
const fs = require("fs");

const express = require('express');
const cors = require("cors");
const helmet = require("helmet");

const userServices = require('./models/user-services');
const jwtServices = require('./models/jwt-services');

const app = express();
const port = 5000;

app.use(cors());
app.use(helmet());

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
        let user = await userServices.getUser(username);
        let htmlEncoded = `<p class="user">${user}</p>`;
        res.status(200).send(htmlEncoded);
    }
    else{
        res.status(404).end("User not found!")
    }
})

app.get('/contacts', async (req,res) =>{
    var allUsersInformation = await userServices.getAllUsers();
    var allUsers = allUsersInformation.map(user => {
        return {name: user.username, phoneNumber:user.phoneNumber}
    })
    //let htmlEncoded = `<p class="user">${allUsers}</p>`;
    return res.status(200).send(allUsers);
})

app.delete('/account/:username', async (req, res) => {
    let username = req.params["username"];
    if(username){
        const userDeleted = await userServices.deleteUser(username)
        //let htmlEncoded = `<p class="user">${userDeleted}</p>`;
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
        let tk = jwtServices.generateAccessToken(userToAdd.username);
        const savedUser = await userServices.addUser(userToAdd);
        //let htmlEncoded = `<p class="user">${tk}</p>`;
        res.status(201).send(tk);
    }
    else{
        res.status(403).end();
    }
})

app.post('/account/login', async (req,res) => {
    var userToLogin = req.body;
    const userFound = await userServices.checkLogin(userToLogin.username, userToLogin.password);

    if(userFound !== false){
        let tk = jwtServices.generateAccessToken(userToLogin.username);
        //let htmlEncoded = `<p class="user">${tk}</p>`;
        res.status(201).send(tk);
    }else{
        res.status(403).end();
    }
});

