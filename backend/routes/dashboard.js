const express = require('express');
const router = express.Router();
const { User, Course, Class } = require('../../src/Models/models');

module.exports = function() {

  router.use('/*', function(req, res, next){
    if(!req.user){
      res.json({
        error: "User isn't logged in"
      })
    }
    next();
  })

  router.get('/dashboard', function(req, res){
    User.findById(req.user._id)
      .populate('courses')
      .exec()
      .then(foundUser => {
        if (foundUser) {
          res.json({
            error: null,
            response: foundUser.courses
          })
        } else {
          res.json({
            error: "Error in finding user"
          });
        }
      })
      .catch(function(error){
        res.json({
          error
        });
      });
  })

  router.get('/class/:id', function(req, res){
    User.findById(req.user._id)
      .populate('courses')
      .exec()
      .then(foundUser => {
        console.log('@@@ foundUser', foundUser);
        // TODO: check structure of User.courses
        var courses = foundUser.courses.map(val=>val._id.toString());
        if (courses.includes(req.params.id)) { // find if the user is enrolled in that course
          return Course.findById(req.params.id).populate('classes').exec()
        } else {
          throw new Error('User is not enrolled in this course')
        }
      })
      .then(foundCourse => {
        console.log('@@@ foundCourse', foundCourse);
        if (foundCourse) {
          res.json({
            error: null,
            response: foundCourse
          });
        } else {
          throw new Error('Course id is invalid.');
        }
      })
      .catch(error => {
        res.json({
          error
        });
      });
  });

  router.get('/getclass/:id', function(req, res){
    Class.findById(req.params.id)
      .populate('questions')
      .populate('topics')
      .exec()
      .then(foundClass => {
        if(!foundClass){
          res.json({
            error: 'Class id is invalid'
          })
        } else {
          res.json({
            error: null,
            response: foundClass
          })
        }
      })
  });

  router.post('/addclass', function(req, res){
    Course.findById(req.body.accessCode)
      .then(foundCourse => {
        if (!foundCourse) {
          res.json({
            error: 'Access code is invalid'
          });
          return;
        }
        return Promise.all( [ User.findById(req.user._id), foundCourse ] );
      })
      .then(result => {
        var user = result[0];
        var course = result[1];
        user.courses.push(course);
        return Promise.all( [ user.save(), foundCourse ] );
      })
      .then(result => {
        var newCourse = result[1];
        res.json({
          error: null,
          response: newCourse
        })
      })
  });

  return router;
};
