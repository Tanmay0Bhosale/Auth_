const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

app.use(cookieParser());

app.get('/', function(req,res){
    let token = jwt.sign({user: "tanmaytanvi1234@gmail.com"},"secret");
    res.cookie('token', token);
    res.send('Cookie is set');
});

app.get('/read' , function(req,res) {
    let data = jwt.verify(req.cookies.token, "secret");
    console.log(data);
});

app.listen(3000, function(){
    // console.log('server is running on port 3000');
});