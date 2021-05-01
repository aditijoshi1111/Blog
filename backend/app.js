const express= require("express");
const path=require('path');
var cors = require('cors')
// const logger=require('morgan');
// var bodyParser = require('body-parser');

const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname,"../frontend/blogs/build")));





const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const { default: AllUserBlogs } = require("../frontend/blogs/src/Components/AllUserBlogs");
mongoose.connect("mongodb://localhost/BlogLogin", {useNewUrlParser: true, 
                                                    useUnifiedTopology: true, 
                                                    useCreateIndex:true, 
                                                    useFindAndModify: false});

mongoose.connection.once('open', ()=>{
    console.log("connected to mongodb")
}).on('error', ()=>{
    console.log("error");
});

const BlogSchema= new mongoose.Schema({
    title: String,
    body: String,
    author: String
});
const Blog = mongoose.model('Blog', BlogSchema);





app.get("/",function(req,res){
    console.log("first get");
    res.sendFile(path.join(__dirname,"../frontend/blogs/src/App.js"));
})
app.get("/getBlogs", function(req,res){
    Blog.find(function(err,data){
        if(err) console.log("Error in getting AllUserBlogs"+ err);

        res.json(data);
    })
})

app.post("/addblog", function(req,res){
    var body=req.body;
    var newBlog= new Blog({
        title: body.title,
        body: body.body,
        author: body.author
    });
    newBlog.save(function(err,data){
        if(err) console.log("Error in saving new Blog");

        res.json(data);
    })
})

app.listen(3002);