const express = require('express');
// const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const app = express();

// app.use(cookieParser());

app.get('/', function(req,res){
    // bcrypt.genSalt(10, function(err, salt) {
    //     bcrypt.hash("password", salt, function(err, hash) {
    //        console.log(hash);
    //     });
    // });

    bcrypt.compare("password", "$2b$10$DtzAhe8ROfdnlrIpGZBQwOXqPkls7BAFumz4GGY.cLwRanI5iwEay", function(err, result) {
        console.log(result);
    });
});


app.listen(3000, function(){
    console.log('server is running on port 3000');
});