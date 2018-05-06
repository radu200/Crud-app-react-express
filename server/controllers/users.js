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
  //validate form

  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })

  } else {

    return CheckEmail()
  }


  function CheckEmail() {
    db.query('SELECT users.email FROM users WHERE email = ?', [email], (err, rows) => {
      if (rows.length) {
        return res.status(400).json({
          errorEmail: 'This email already exists'
        })
      } else {

        return CreateUser()
      }
    })
  }


  function CreateUser() {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      console.log(hash)
      let user = {
        username: username,
        email: email,
        password: hash
      }

      //create new user
      db.query('INSERT INTO users SET ?', user, (err, rows) => {
        if (err) {
          console.log('[mysql]', err)
        } else {
    
        res.status(200).json({
          successMsg: 'Your account has been created succefully'
        }) 
         
        }
      })

    })

  }
};

module.exports.postLogin = (req, res, next) => {

  const email = req.body.email;
  const password = req.body.password;


  const validationResult = validateLoginForm(req.body);


  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })

  } else {


    passport.authenticate('local-login', {
      session: true
    }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(400).json(info)
      } else {
        req.logIn(user, function (err) {
          if (err) {
            return next(err);
          }
          return res.status(200).json({
            success: true,
            message: 'Login success',
            token: req.session.id,

          })
        });

      }
    })(req, res, next);


  }
};


module.exports.getLogout = function (req, res, next) {
  req.logout();

  req.session.destroy(function (err) {
    if (err) {
      return next(err);
    } else {
      // destroy session data
      req.session = null;

      res.redirect('/login');

    }

  });

};