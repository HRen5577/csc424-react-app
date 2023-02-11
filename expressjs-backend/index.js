const express = require('express');
const cors = require("cors");

const userServices = require('./models/user-services');
const jwtServices = require('./models/jwt-services');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

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

app.delete('/account/:username', async (req, res) => {
    let username = req.params["username"];
    if(username){
        res.status(200).send(await userServices.deleteUser(username))
    }
    else{
        res.status(404).end("User not found!")
    }
})

app.post('/account/register', async (req, res) => {
    var userToAdd = req.body;
    const userFound = await userServices.checkUsernameExists("personB");

    if(userFound !== true){
        userToAdd.token = jwtServices.generateAccessToken("personB");
        const savedUser = await userServices.addUser({username:"personB",password:"personB",token:userToAdd.token});
        res.status(201).send(savedUser);
    }
    else{
        res.status(403).end();
    }
})

app.post('/account/login', jwtServices.authenticateToken, async (req,res) => {
    var userToLogin = req.body;
    //const userFound = await userServices.checkLogin(userToLogin.username,userToLogin.password);
    const userFound = await userServices.checkLogin("hr","csc424");

    if(userFound){
        userToLogin.token = '2342f2f1d131rf12';
        res.status(201).send(userToLogin);
    }else{
        res.status(403).end();
    }
});


app.listen(port, () => {
    console.log(`Example appp listening at http//localhost:${port}`);
});