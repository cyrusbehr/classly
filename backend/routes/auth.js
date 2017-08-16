var express = require('express');
var router = express.Router();
var { User } = require('../models/User');
var util = require('util');

module.exports = function(passport) {

  // POST registration page
  router.post('/register', function(req, res) {

    console.log('POST in /register');
    req.checkBody('userType', 'Invalid userType').isIn(['student', 'professor', 'ta']);
    req.checkBody('firstname', 'Firstname cannot be empty').notEmpty();
    req.checkBody('lastname', 'Lastname cannot be empty').notEmpty();
    req.checkBody('email', 'Error with email').isEmail();
    req.checkBody('passwordRepeat', 'Passwords must be the same').equals(req.body.password);

    req.getValidationResult()
    .then(function(result){
      if (!result.isEmpty()) { // Error in the validations above
        res.json({
          error: util.inspect(result.array())
        });
        return;
      }

      User.findOne({email: req.body.email})
      .then(function(foundUser){
        if(foundUser){
          throw new Error('email is taken');
        } else {
          var user = new User({
            userType: req.body.userType,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password
          });

          return user.save()
        }
      })
      .then(function(savedUser){
        res.json({
          error: null,
          response: savedUser
        })
      })
      .catch(function(error){
        res.json({
          error
        })
      })
    })
  });

  // POST Login page
  router.post('/login', passport.authenticate('local', {'failureRedirect': '/failure'} ), function(req, res) {
    res.json({
      error: null,
      response: req.user
    });
  });

  router.get('/failure', function(req, res) {
    res.json({
      error: 'Incorrect username or password'
    });
  });

  // GET Logout page
  router.get('/logout', function(req, res) {
    req.logout();
  });

  return router;
};
