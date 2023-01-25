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
    res.status(201).send(users);
})

app.post('/account/login', (req,res) => {
    var userToLogin = req.body;
    const userFound = userFunctions.searchUser(userToLogin.username,userToLogin.password);
    
    console.log(userFound);
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