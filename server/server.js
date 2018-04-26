const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const http = require('http');
const expressValidator = require('express-validator');
const app = express();
require('dotenv').config({
  path: '.env'
})

//controllers
const employees = require('./controllers/employees.js')



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(expressValidator({}));

//routes
app.get('/employees', employees.getEmployees)
app.post('/employee/add', employees.addEmployee)
app.get('/employee/:id', employees.getEmployeeDetails)
app.get('/employee/edit/:id', employees.getEditEmployee )
app.post('/employee/edit/:id', employees.postEditeEmployee  )
app.post('/employee/delete/:id', employees.deleteEmployee)

const port = 5000;
app.listen(port, () => `Server running on port ${port}`);