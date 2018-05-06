const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport')
const bcrypt = require('bcrypt');
const db = require('./database');
const saltRounds = 10;


module.exports = (passport) => {

    passport.serializeUser(function (user, done) {
        console.log('seriliaze', user)
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        console.log('deserialiaze', user)
        done(null, user);

    });
    
    passport.use('local-login',new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {

        db.query('SELECT * FROM users WHERE email = ?', [email], (err,rows) => {

        
        if (!rows.length) {
             return done (null,false, {message:'Your email or password is incorrect. Please try again'})
            
        } else {
            const hash = rows[0].password;
            bcrypt.compare(password, hash , (err,response) => {

                if (response === true) {
                    return done(null, rows[0]);
                } else {
                    return done (null,false, {message:'Your email or password is incorrect. Please try again'})

                }
            })  
          }
       })
    }))
}