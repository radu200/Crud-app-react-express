const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const http = require('http');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const MySQLStore = require('express-mysql-session')(session);
const expressValidator = require('express-validator');
const app = express();
require('dotenv').config({
  path: '.env'
})


///server react static files for  production 
app.use(express.static(path.join(__dirname, '../client/build')))

//controllers
const employees = require('./controllers/employees.js')
const users = require('./controllers/users.js')



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database : process.env.DB_NAME,
  //checkExpirationInterval: 9000,
  // expiration: 864
};
const sessionStore = new MySQLStore(options);
var expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

app.use(session({ 
  secret:'my secret', 
  store: sessionStore,
  resave:true, //session will be saved each time no matter if exist or not
  saveUninitialized: false,  //if it's true session will be stored on server no matter if is something there
  expires: expiryDate //1 hour
 // cookie: {   secure: true, // httpOnly: true, // domain: 'example.com',  //path: 'foo/bar', 
//},
}));
app.use(passport.initialize());
app.use(passport.session());

//sessions



//routes
app.get('/employees', employees.getEmployees)
app.post('/employee/add', employees.addEmployee)
app.get('/employee/:id', employees.getEmployeeDetails)
app.get('/employee/edit/:id', employees.getEditEmployee )
app.post('/employee/edit/:id', employees.postEditeEmployee  )
app.post('/employee/delete/:id', employees.deleteEmployee)


//authentication
app.post('/signup', users.postSignUp)
app.post('/login', users.postLogin)
const port = 5000;
app.listen(port, () => `Server running on port ${port}`);