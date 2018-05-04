const db = require('../config/database.js')
const validator = require('validator');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const saltRounds = 10;

/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateSignupForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
    isFormValid = false;
    errors.username = 'Please provide your username.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateLoginForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false;
    errors.email = 'Please provide your email address.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

module.exports.postSignUp = (req, res) => {

  //get input values
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  const validationResult = validateSignupForm(req.body);


  new Promise(function (resolve, reject) {
    db.then((conn) => conn.query('SELECT users.email FROM users WHERE email = ?', [email])
      .then(([rows, fields]) => {

        if (rows.length) {
          resolve(res.status(400).json({
            errors: 'email already taken'
          }))
        } else {
          resolve(

            bcrypt.hash(password, saltRounds).then((hash) => {
              // Store hash in your password DB.

              let user = {
                username: username,
                email: email,
                password: hash
              }

              db.then((conn) => conn.query('INSERT INTO users SET ?', user))
                .then(([rows, fields]) =>

                  res.redirect('/'))
                 .catch((err) => {
                   console.log(' err creat new user authentication [mysql error]', err)
                 })

            }) //bcrypt ends

          )
        }
      }).catch((err) => {
        console.log(' err check email on signup authentication[mysql error]', err)
      })
    )

  }).catch((err) => {
    console.log('err  sign-up')
  })

  // console.log('result',result)




  //   if (rows.length === true){
  //    return new Promise ((resolve,reject) => {
  //       resolve (res.redirect('/signup').json({
  //         Errmessage:'this email already taken'
  //       }))
  //    })
  //  } else {
  //     resolve(res.json({
  //       success:'everything ok'
  //     }))

  // }





  // new Promise(function(resolve, reject) {

  //   setTimeout(() => resolve(1)); // (*)

  // }).then(function(result) { // (**)
  //  if (result === 1 ){
  //   return new Promise((resolve, reject) => { // (*)
  //     setTimeout(() => resolve(result * 2), 1000);
  //   });
  //  }
  //   console.log(result); // 1
  //   return result * 2;

  // }).then(function(result) { // (***)

  //   console.log(result); // 2
  //   return result * 2;

  // }).then(function(result) {

  //   console.log(result); // 4
  //   return result * 2;

  // });

  //   if (!validationResult.success) {
  //   return  res.status(400).json({
  //    success: false,
  //    message: validationResult.message,
  //    errors: validationResult.errors
  //  });

  //  } else {


  //    db.then((conn) => conn.query('SELECT * FROM users WHERE email = ?', [email])
  //     .then(([rows,fields]) =>  {

  //     if (rows.length === true){
  //       console.log('email taken')
  //       return res.redirect('/signup').json({
  //         message:'this email already taken'
  //       })
  //       console.log('email taken')
  //       }
  //    })
  //   )






  // db.then((conn) => conn.query('SELECT * FROM users WHERE email = ?', [email])
  // .then(([rows, fields]) => {

  // if (rows.length === true){
  //   console.log('email taken')
  //   // return res.redirect('/signup').json({
  //   //   Errmessage:'this email already taken'
  //   // })


  // } else {


  //       }

  //     }))
  //     .catch((err) => {
  //       console.log('[mysql error]', err)
  //     })

  //  }




  //bcrypt ends








};

module.exports.postLogin = (req, res, next) => {


  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  const validationResult = validateLoginForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  } else {



  }

};