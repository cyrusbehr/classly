const express = require('express');
const router = express.Router();
const { User } = require('../../src/Models/models');
const util = require('util');
const bcrypt = require('bcryptjs');

module.exports = function(passport) {

  // POST registration page
  router.post('/register', function(req, res) {

    req.checkBody('userType', 'Invalid userType').isIn(['student', 'professor', 'ta']);
    req.checkBody('firstname', 'Firstname cannot be empty').notEmpty();
    req.checkBody('lastname', 'Lastname cannot be empty').notEmpty();
    req.checkBody('email', 'Invalid email').isEmail();
    req.checkBody('passwordRepeat', 'Passwords must be the same').equals(req.body.password);

    req.getValidationResult()
    .then(function(result){
      if (!result.isEmpty()) { // Error in the validations above
        res.json({
          error: result.array()
        });
        return;
      }

      User.findOne({email: req.body.email})
      .then(function(foundUser){
        if(foundUser){
          // throw new Error('email is taken');
          throw [{
            'param': 'email',
            'msg': 'Email is taken'
          }];
        } else {
          const saltRounds = 10;
          const hash = bcrypt.hashSync(req.body.password, saltRounds);

          var user = new User({
            userType: req.body.userType,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hash,
            isModal: false,
            userType: req.body.userType,
          });

          return user.save()
        }
      })
      .then(function(savedUser){
        req.login(savedUser, function(err) {
          if (err) {
            console.log('Error in logging in user after registration', err);
            res.json({
              error: [{param: 'email', msg: 'Error in logging in user after registration'}]
            })
          } else {
            res.json({
              error: null,
              response: savedUser
            })
          }
        });

      })
      .catch(function(error){
        console.log('error', error);
        res.json({
          error: error
        })
      })
    })
  });

  // POST Login page
  router.post('/login', passport.authenticate('local', {'failureRedirect': '/failure'} ), function(req, res) {
    var responseUser = Object.assign({}, req.user)
    var responseUser = responseUser._doc;
    delete responseUser.password;
    res.json({
      error: null,
      response: responseUser
    });
  });


  // TODO: DEBUG THIS ROUTE
  router.post('/getcourses', function(req, res) {
    User.findById(req.body.user._id)
    .populate('courses')
    .then((user) => {
      if(!user){
        res.json({
          error: "User is null",
          response: "Error"
        })
      } else {
        res.json({
          error: null,
          user: user
        })
      }
    })
  });

  router.get('/failure', function(req, res) {
    res.json({
      error: 'Incorrect username or password'
    });
  });


  router.get('/checkLogin', function(req, res) {
    var responseUser = null;
    if(req.user) {
       responseUser = Object.assign({}, req.user)
       responseUser = responseUser._doc;
      delete responseUser.password;
    }

    res.json({
      loggedIn: !!req.user,
      user: responseUser
    });
  })

  router.get('/showModal', function(req, res) {
    User.findById(req.user._id)
    .then((user) => {
      console.log(user);
      if(!user.isModal){
        res.json({
          isModal: false
        })
        user.isModal = true;
        user.save()
      } else {
        res.json({
          isModal: true
        })
      }
    })
  })

  // GET Logout page
  router.get('/logout', function(req, res) {
    req.logout();
    res.json({logout: true})
  });

  return router;
};
