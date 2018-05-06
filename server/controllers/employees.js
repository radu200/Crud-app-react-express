const db = require('../config/database.js')
const expressValidator = require('express-validator');

module.exports.getEmployees = (req, res) => {
    db.query('SELECT * FROM employees  WHERE user_id = ? ', [req.user.id], (err,rows) => {
      if (err){
        console.log('[mysql error]', err)
      } else {
         res.json(rows)
      }
    })

  }


 module.exports.addEmployee = (req, res) => {

    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const Position = req.body.Position;
    const Email = req.body.Email;  
    const Phone = req.body.Phone;  
    const Date = req.body.Date;  

    //validation
    req.checkBody('FirstName', 'FirstName field cannot be empty.').notEmpty();
    req.checkBody('FirstName', 'FirstName must be between 1 and 150 characters.').len(1,150);
    req.checkBody('LastName', 'LastName field cannot be empty.').notEmpty();
    req.checkBody('LastName', 'LastName must be between 1 and 150 characters.').len(1,150);
    req.checkBody('Position', 'Position field cannot be empty.').notEmpty();
    req.checkBody('Position', 'Position must be between 1 and 150 characters.').len(1,150);
    req.checkBody('Email', 'Email is not valid .').isEmail();
    req.checkBody('Email', 'Email must be between 1 and 150 characters.').len(1,150);
    req.checkBody('Phone', 'Email must be between 1 and 150 characters.').len(1,20);
    req.checkBody({'Phone':{ optional: {  options: { checkFalsy: true }},isDecimal: {  errorMessage: 'The Number must be a decimal'} } });
    req.checkBody('Date', 'Phone number must be between 1 and 150 characters.').len(1,20);

    let errors = req.validationErrors();
    if (errors) {
     return res.status(400).json({
       errors
     });
    }

    let employees = {
      first_name: FirstName,
      last_name: LastName,
      position:Position,
      email:Email,
      phone_number:Phone,
      Date_hired:Date,
      user_id:req.user.id
    }
  
    db.query('INSERT INTO employees SET ?', employees, (err, rows) => {
      if (err){
        console.log('[mysql error]', err)
      }else{
        res.redirect('/')
      }
    }) 
  }
  
  ///detail page
  module.exports.getEmployeeDetails =  (req, res) => {
    db.query('SELECT * FROM employees WHERE id = ?', [req.params.id], (err,rows) => {
      if (err){
        console.log('[mysql error]', err)
      } else{
         res.json(rows)
      }
    })

  }
  
  
   module.exports.getEditEmployee  = (req, res) => {
    db.query('SELECT * FROM employees WHERE id = ?', [req.params.id], (err,rows) => {
      if (err){
        console.log('[mysql error]', err)
      } else{
        db.query('SELECT LAST')
         res.json(rows)
      }
    }) 
  }
   
  module.exports.postEditeEmployee  = (req, res) => {
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const Position = req.body.Position;
    const Email = req.body.Email;  
    const Phone = req.body.Phone;  
    const Date = req.body.Date;  

    //validation
    req.checkBody('FirstName', 'FirstName field cannot be empty.').notEmpty();
    req.checkBody('FirstName', 'FirstName must be between 1 and 150 characters.').len(1,150);
    req.checkBody('LastName', 'LastName field cannot be empty.').notEmpty();
    req.checkBody('LastName', 'LastName must be between 1 and 150 characters.').len(1,150);
    req.checkBody('Position', 'Position field cannot be empty.').notEmpty();
    req.checkBody('Position', 'Position must be between 1 and 150 characters.').len(1,150);
    req.checkBody('Email', 'Email is not valid .').isEmail();
    req.checkBody('Email', 'Email must be between 1 and 150 characters.').len(1,150);
    req.checkBody('Phone', 'Phone must be between 1 and 150 characters.').len(1,20);
    req.checkBody({'Phone':{ optional: {  options: { checkFalsy: true }},isDecimal: {  errorMessage: 'The Number must be a decimal'} } });
    req.checkBody('Date', 'Phone number must be between 1 and 150 characters.').len(1,20);
   
   
    let errors = req.validationErrors();
    if (errors) {
     return res.send(errors);;
    }
    let employees = {
      first_name: FirstName,
      last_name: LastName,
      position:Position,
      email:Email,
      phone_number:Phone,
      date_hired:Date
    }


    db.query(`UPDATE employees SET ?  WHERE id =${req.params.id}` , employees, (err,rows) => {
        if (err){
          console.log('[mysql error]', err)
        } else{
           res.redirect('/')
        }
      
    })
       
  }
  
  
  //delete post 
  module.exports.deleteEmployee =  (req, res) => {
    db.query(`DELETE FROM employees WHERE  id =${req.params.id}`, (err, rows) => {
      if (err){
        console.log('[mysql error]', err)
      } else{
         res.redirect('/')
      }
    })
  }