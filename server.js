const express =require("express")
const jwt = require("jsonwebtoken");
const app=express();
const path=require("path")
const {userModel,todoModel} = require('./db.js');
const mongoose = require("mongoose")
const {jwt_secret, auth} = require('./auth.js');
app.use(express.json());

async function monogoConnect() {
    await mongoose.connect("mongodb+srv://saigoud1710:saiteja@cluster0.8dxyp.mongodb.net/TodoApplication")
}
monogoConnect();

async function isUserExist(email , password){
  const user = await userModel.findOne({
    email : email,
    password : password
  })
  console.log(user)
  return user;
}

app.post('/signup',async function(req,res){
    const email=req.body.email;
    const password=req.body.password;
    const name = req.body.name;
    const isUser=await isUserExist(email,password);
    console.log(isUser)
    if(isUser){
        res.status(403).send("User Already Exists");
    }
    else{
        await userModel.create({
            email: email,
            password : password , 
            name : name 
        })
        res.status(200).send("Your are Signed Up Successfully");
    }
});

app.post('/signin',async function(req,res){
    const email = req.body.email;
    const password =req.body.password;
    
    const isUser = await isUserExist(email , password);
    if(isUser){
        const token = jwt.sign({
            userId : isUser._id
        },jwt_secret);
        console.log(token);
        res.status(200).send("You are SignedIn Successfully");
    }else{
        res.status(403).send("Your Credentials are Wrong.");
    }
})

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,"index.html"));
})

app.listen(3000)