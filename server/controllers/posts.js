
const db = require('../config/database.js')



module.exports.getPosts = (req, res) => {
    db.then((conn) => conn.query('SELECT * FROM posts'))
      .then(([rows, fields]) =>
        res.json(rows))
      .catch((err) => {
        console.log('[mysql error]', err)
      })
  
  }


 module.exports.addPost = (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
  
    let posts = {
      title: title,
      description: description
    }
  
    db.then((conn) => conn.query('INSERT INTO posts SET ?', posts))
      .then(([rows, fields]) =>
        res.json(rows))
      .catch((err) => {
        console.log('[mysql error]', err)
      })
  
  }
  
  ///detail page
  module.exports.getDetailPage =  (req, res) => {
    db.then((conn) => conn.query('SELECT * FROM posts WHERE id = ?', [req.params.id]))
      .then(([rows, fields]) =>
        res.json(rows))
      .catch((err) => {
        console.log('[mysql error]', err)
      })
  
  }
  
  
   module.exports.editPost  = (req, res) => {
      const title = req.body.title;
      const description = req.body.description;
  
       let posts = {
        title: title,
        description: description
    }
  
    db.then((conn) => conn.query('INSERT INTO posts SET ?', posts))
      .then(([rows, fields]) =>
        res.json(rows))
      .catch((err) => {
        console.log('[mysql error]', err)
      })
  }
  
  
  //delete post 
  module.exports.deletePost =  (req, res) => {
    db.then((conn) => conn.query(`DELETE FROM posts WHERE  id =${req.params.id}`))
      .then(([rows, fields]) =>
        res.json(rows))
      .catch((err) => {
        console.log('[mysql error]', err)
      })
  
  }