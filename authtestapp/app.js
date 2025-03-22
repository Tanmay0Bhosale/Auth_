const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const userModel = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.set('view engine', 'ejs');

app.get('/' , (req,res)=>{
    res.render('index');
});

app.post('/create' ,  (req,res)=>{
    let {username,email,password,age} = req.body;
    bcrypt.genSalt(10,  (err,salt)=>{
        bcrypt.hash(password , salt , async (err,hash)=>{
                let user = await userModel.create({
                    username,   
                    email,
                    password : hash,
                    age
                })
            let token = jwt.sign({email},"shshshshsh");
            res.cookie("token",token);
            res.send(user);
        });
    });
    
   
});

app.get('/logout' , (req,res)=>{
   res.cookie("token","");
   res.redirect('/');   
});

app.get('/login' , (req,res)=>{
    res.render('login');  
 });

 app.post('/login' , async (req,res)=>{
    let user = await userModel.findOne({email : req.body.email});
    if(!user) res.send("Something is wrong");
    bcrypt.compare(req.body.password,user.password, function(err,result){
        if(result) {
            let token = jwt.sign({email:user.email},"shshshshsh");
            res.cookie("token",token);
            res.send("You can login");
        }
        else res.send("Soemthig is wrong");
        
    })
 });

//  app.get('/home', async (req,res)=>{
//     const token = req.cookies.token;
//     // console.log(token);
//     const decoded = jwt.verify(token, "shshshshsh"); 
//         const email = req.user = await userModel.findOne({ email: decoded.email });
//     res.send(email);
//  })

app.listen(3000);