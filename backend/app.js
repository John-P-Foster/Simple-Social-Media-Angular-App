const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

// This Post constent is coming from the post model 
const Post = require('./models/post')

const app = express();

//this is how you connect to the mongoDB with your admin creds. 
//the creds are Account: jophnpetefoster  and Password: rg2DUu9me8R6CDyr
//The data base is being saved in the mongoDB called .....................................|node-angular|
mongoose.connect('mongodb+srv://johnpetefoster:rg2DUu9me8R6CDyr@cluster0.bfdj5.mongodb.net/node-angular?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log('Connected to database!')
})
.catch(()=>{
    console.log('Connection failed!')
});

app.use(bodyParser.json());

app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
    next();
});

app.post("/api/posts", (req, res, next)=>{
    //the .body function comes from bodyParser that was inported at the top via the reqauire
    //method. Its taking the incoming json request and parsing it for typescript. 
    const post = Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then(createdPost => {
        res.status(201).json({
            message: 'Post added succesfully',
            postId: createdPost._id
        })
    }); 
});


// The /post is a filter that will only allow get post req to port 3000
app.get('/api/posts',(req,res,next)=> {
    // This is how we got the old dummy data
    // const posts =[
    //     {
    //         id: 'asdgine', 
    //         title: 'First server-side post', 
    //         content: "This is coming form the server!"

    //     },
    //     {
    //         id: 'qwetgbg', 
    //         title: 'Second server-side post', 
    //         content: "This is coming form the server!"

    //     },
    // ];

    //This is how we get real data from the server.
    Post.find().then(documents => {
        //console.log(documents)
        res.status(200).json({
            message: 'Post feteched succesfully!',
            posts: documents
        });
    });
});

// :id creates a dynamic path starting at the id token
app.delete("/api/posts/:id", (req, res, next) =>{
    Post.deleteOne({_id: req.params.id}).then(result =>{
        console.log(result);
        res.status(200).json({message: "Post deleted!"});
    })
});

module.exports = app;