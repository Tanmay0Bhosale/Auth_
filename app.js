const express = require('express');
// const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const app = express();

// app.use(cookieParser());

app.get('/', function(req,res){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("password", salt, function(err, hash) {
           console.log(hash);
        });
    });
});


app.listen(3000, function(){
    console.log('server is running on port 3000');
});