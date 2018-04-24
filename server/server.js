const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const http = require('http');
const app = express();
require('dotenv').config({
  path: '.env'
})

//controllers
const post = require('./controllers/posts.js')



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
//routes
app.get('/posts', post.getPosts)
app.post('/posts/add', post.addPost)
app.get('/posts/:id', post.getDetailPage)
app.get('/posts/edit', post.editPost)
app.post('/posts/delete/:id', post.deletePost)



const port = 5000;

app.listen(port, () => `Server running on port ${port}`);