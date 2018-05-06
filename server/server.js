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

require('./config/passport')(passport);

///server react static files for  production 
app.use(express.static(path.join(__dirname, '../client/build')))

//controllers
const employees = require('./controllers/employees.js')
const users = require('./controllers/users.js')



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
//app.use(cookieParser())
app.use(expressValidator()); 

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
  resave:false, //session will be saved each time no matter if exist or not
  saveUninitialized: false,  //if it's true session will be stored on server no matter if is something there
  store: sessionStore,
  expires: expiryDate //1 hour

 // cookie: {   secure: true, // httpOnly: true, // domain: 'example.com',  //path: 'foo/bar', 
//},
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
      next();
  }
});



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
app.get('/logout', users.getLogout)

const port = 5000;
app.listen(port, () => `Server running on port ${port}`);