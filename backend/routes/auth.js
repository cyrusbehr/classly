var express = require('express');
var router = express.Router();
var { User } = require('../models/User');

module.exports = function(passport) {

  // POST registration page
  router.post('/register', function(req, res) {
    // TODO: improve validation
    console.log('POST in /register');

    if(req.body.password === req.body.password_repeat) {
      var user = new User({
        username: req.body.username,
        password: req.body.password
      });

      user.save(function(err, user) {
        if (err) {
          console.log(err);
          res.json({
            success: false,
            error: 'Error in saving user in database'
          });
          return;
        }
        console.log(user);
        res.json({
          success: true
        });
      });
    } else {
      res.json({
        success: false,
        error: 'Invalid register field(s)'
      });
    }

  });

  // POST Login page
  router.post('/login', passport.authenticate('local', {'failureRedirect': '/failure'} ), function(req, res) {
    res.json({
      success: true
    });
  });

  router.get('/failure', function(req, res) {
    res.json({
      success: false,
      error: 'Incorrect username or password'
    });
  });

  // GET Logout page
  router.get('/logout', function(req, res) {
    req.logout();
  });

  return router;
};
