const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const http = require('http');
const app = express();
require('dotenv').config({
  path: '.env'
})
const db = require('./config/database.js')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));



app.get('/posts', (req, res) => {
  db.query('SELECT * FROM posts ', function (err, results) {
    if (err) {
      console.log('[mysql error]', error)
    } else {

      res.json(results);
    }

  })
});


app.post('/posts/add', (req, res) => {
  const title = req.body.title;
  const description = req.body.description;

  let posts = {
    title: title,
    description: description
  }
  db.query('INSERT INTO posts SET ?', posts, function (err, results, fileds) {
    if (err) {
      console.log('[mysql error]', error)
    } else {
      res.json(results);
    }
  })
})

///detail page
app.get('/posts/:id', (req, res) => {

  db.query('SELECT * FROM posts WHERE id = ?',[req.params.id], function (err, results) {
    if (err) {
      console.log('[mysql error]', error)
    } else {

      res.json(results);
    }

  })
 
})


app.get('/posts/edit', (req, res) => {
  const title = req.body.title;
  const description = req.body.description;

  let posts = {
    title: title,
    description: description
  }
  db.query('INSERT INTO posts SET ?', posts, function (err, results, fileds) {
    if (err) {
      console.log('[mysql error]', error)
    } else {
      res.json(results);
    }
  })
})


//delete post 
app.get('/posts/delete', (req, res) => {
 
  db.query(`DELETE FROM posts WHERE  id =${req.body.id}`, function (err, results, fileds) {
    if (err) {
      console.log('[mysql error]', error)
    } else {
      res.json(results);
    }
  })
})

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);