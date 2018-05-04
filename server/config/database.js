
  
const mysql = require('mysql2/promise'); 

 const connection = mysql.createConnection({   
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database : process.env.DB_NAME })
  .catch((err) => {
    console.log('database connection',err)
  })
  
  module.exports = connection;

  