const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const {v4 : uuidv4} = require("uuid");

const port = 8080;

app.use(express.urlencoded())
app.use(express.json())
app.use(methodOverride('_method'))

let posts = [
    {
        id : "1a",
        username:"sahil",
        content:"hi my name is sahil jain and I am a btech student at manipal university Jaipur"
    },
    {
        id : uuidv4(),
        username:"naman",
        content:"I am studing in class 10th"
    }
    ,{
        id : uuidv4(),
        username:"mayank",
        content:"I am currently preparing for the ssc mts"
    }
    ,{
        id : uuidv4(),
        username:"shanu Jain",
        content:"Hi , I am a second grade teacher"
    }
]


app.set("view engine" , "views")
app.set("views" , path.join(__dirname , "views"))

app.use(express.static(path.join(__dirname , "public")));

app.get(["/" , "/home" , "/index"] , (req , res)=>{
    res.render("index.ejs" , {posts});
})


app.listen(port , ()=>{
    console.log("Server is listening for Quora(new) at port :", port);
})

app.get("/posts" , (req ,res)=>{
    console.log("request recieved for all posts")
    res.render("index.ejs" , {posts});
})

app.get("/posts/new" , (req , res)=>{
    res.render("form.ejs");
})

app.post("/posts" , (req , res)=>{
    // add the new post in the posts
    // posts.push(req.body);
    let newpost = req.body;
    newpost.id = uuidv4();
    posts.push(newpost);
    console.log(req.body);
    res.redirect("/posts")
})

app.delete("/posts/:id" , (req , res) => {
    // remove the post from the post that has id == req.params.id
    let delid = req.params.id;
    // posts = posts.filter(obj => obj.id !== id);
    posts = posts.filter((p) => p.id !== delid);
    res.redirect("/posts");
})

app.get("/posts/:id" , (req , res)=>{
    // this will show the individual post to the page
    const post = posts.find(obj => obj.id == req.params.id);
    console.log(req.params);
    console.log(post)
    res.render("post.ejs", post)
})


app.get("/posts/edit/:id" , (req ,res)=>{
    // form of the edit
    let {id} = req.params;
    let post = posts.find((p) => p.id === id)
    
    console.log(post , id)
    console.log("hi")
    res.render("edit_form.ejs" , { post: post });
})

app.patch("/posts/:id" , (req , res)=>{
    let {id} = req.params;
    // now we have the id and the content and the post so update the content of the post

    for(post of posts){
        if(post.id == id){
            post.content = req.body.content;
        }
    }
    res.redirect("/posts")
})

