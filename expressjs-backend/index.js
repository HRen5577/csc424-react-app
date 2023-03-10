const https = require("https");
const fs = require("fs");

const express = require('express');
const cors = require("cors");
const helmet = require("helmet");
const escape = require("lodash.escape");

const userServices = require('./models/user-services');
const jwtServices = require('./models/jwt-services');

const app = express();
const port = 5000;

app.use(cors());
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    useDefaults: false, // you can change it to `true` if you want.
    directives:{
      defaultSrc: [
        '\'self\'',
        'https://localhost:3000',
      ],
      styleSrc: [
        '\'self\'',
        '\'unsafe-inline\'',
        'https://localhost:3000',
      ],
      imageSrc: [
        '\'self\'',
        '\'unsafe-inline\'',
        'data:',
        'https://localhost:3000',
      ],
      scriptSrc: [
        '\'self\'',
        '\'unsafe-inline\'',
        'https://localhost:3000',
      ],
      contentSrc: [
        '\'self\'',
        '\'unsafe-inline\'',
        'https://localhost:3000',
      ],
    }
  }));

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
        let user = await userServices.getUser(username);
        let userHtml = escape(user);
        let htmlEncoded = `<p class="user">${userHtml}</p>`;
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
    //let userHtml = escape(allUsers);
    //let htmlEncoded = `<p class="user">${userHtml}</p>`;
    return res.status(200).send(allUsers);
})

app.delete('/account/:username', async (req, res) => {
    let username = req.params["username"];
    if(username){
        const userDeleted = await userServices.deleteUser(username);
        //let userHtml = escape(usersDeleted);
        //let htmlEncoded = `<p class="user">${userHtml}</p>`;
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
        //let tkHTML = escape(tk);
        //let htmlEncoded = `<p class="user">${tkHTML}</p>`;
        res.status(201).send(tk);
    }
    else{
        res.status(403).end();
    }
})

app.post('/account/login', async (req,res) => {
    var userToLogin = req.body;
    console.log(userToLogin);
    const userFound = await userServices.checkLogin(userToLogin.username, userToLogin.password);

    if(userFound !== false){
        let tk = jwtServices.generateAccessToken(userToLogin.username);
        //let tkHTML = escape(tk);
        //let htmlEncoded = `<p class="user">${tkHTML}</p>`;        
        res.status(201).send(tk);
    }else{
        res.status(403).end();
    }
});

