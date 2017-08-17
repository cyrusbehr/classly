const express = require('express');
const router = express.Router();
const { User, Course } = require('../../src/Models/models');

module.exports = function() {

  router.get('/dashboard', function(req, res){
    if (req.user) {
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
    } else {
      res.json({
        error: "User isn't logged in"
      });
    }
  })

  router.get('/class/:id', function(req, res){
    console.log('received GET at /class/:id');
    if (req.user) {
      User.findById(req.user._id)
        .populate('courses')
        .exec()
        .then(foundUser => {
          console.log('@@@ foundUser', foundUser);
          // TODO: check structure of User.courses
          var courses = foundUser.courses.map(val=>val._id.toString());
          if (courses.includes(req.params.id.substring(1))) { // find if the user is enrolled in that course
            return Course.findById(req.params.id.substring(1))
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
    } else {
      res.json({
        error: "User isn't logged in"
      });
    }
  });
  return router;
};
