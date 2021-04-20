const express= require("express");
const path=require('path');
var cors = require('cors')
const mongoose = require("mongoose");

const app=express();

const mongodb="mongodb://localhost/mydb";
mongoose.connect(mongodb, {useNewUrlParser: true, useUnifiedTopology: true});

var db=mongoose.connection;
db.on('error',console.error.bind(console, "error correction:"))
db.once('open', function(){console.log("connected to mongodb")});

const RegisterSchema= new mongoose.Schema({
    name: String,
    email: String,
    Password: String,
    bio: String
});
const Register = mongoose.model('Register', RegisterSchema);

const john = new Register({name: "JohnDoe",
                        email: "john@example.com", 
                        password: "john",
                        bio: "i like to read books"
                    });
app.use(cors())
app.use(express.static(path.join(__dirname,"../frontend/blogs/build")));

app.get("/",function(req,res){
    res.sendFile(path.join(__dirname,"../frontend/blogs/src/App.js"));
})
app.post("/login", function(res,req){
    console.log("received");
})
app.listen(3002);