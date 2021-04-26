const express= require("express");
const path=require('path');
var cors = require('cors')

const app=express();


const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/BlogLogin", {useNewUrlParser: true, 
                                                    useUnifiedTopology: true, 
                                                    useCreateIndex:true, 
                                                    useFindAndModify: false});

mongoose.connection.once('open', ()=>{
    console.log("connected to mongodb")
}).on('error', ()=>{
    console.log("error");
});

const RegisterSchema= new mongoose.Schema({
    name: String,
    email: String,
    Password: String,
    bio: String
});
const Register = mongoose.model('Register', RegisterSchema);



app.use(cors())
app.use(express.static(path.join(__dirname,"../frontend/blogs/build")));

app.get("/",function(req,res){
    console.log("first get");
    res.sendFile(path.join(__dirname,"../frontend/blogs/src/App.js"));
})
app.post("/login", function(res,req){
    console.log("received");
})
app.post("/register", function(res,req){
    console.log("rgister");
});

app.listen(3001);