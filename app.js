const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

app.get('/', function(req,res){
    res.cookie("name","tanmay");
    res.send("Done");
});

app.get('/read', function(req,res){
    console.log(req.cookies);
    res.send("read page");
});
app.listen(3000, function(){
    console.log('server is running on port 3000');
});