const userFunctions = require("./User");
const cors = require("cors");
const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.get('/', (req, res)=>{
    res.send("Hello World");
});


app.get('/account', (req, res) => {
    res.status(201).send(userFunctions.getUsers());
})

app.get('/account/:username', (req, res) => {
    console.log(req.params)

    res.status(201).send(userFunctions.getUser(req.query.username));
})

app.post('/account/register', (req, res) => {
    var userToAdd = req.body;
    const userFound = userFunctions.searchUsername(userToAdd.username);

    if(userFound !== true){
        userFunctions.addUser({
            username: userToAdd.username,
            password: userToAdd.password
        });
        userToAdd.token = '2342f2f1d131rf13';
        res.status(201).send(userToAdd);
    }
    else{
        res.status(403).end();
    }
})

app.post('/account/login', (req,res) => {
    var userToLogin = req.body;
    const userFound = userFunctions.searchUser(userToLogin.username,userToLogin.password);
    
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