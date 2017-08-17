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
    if (req.user) {
      User.findById(req.user._id)
        .then(foundUser => {
          // TODO: check structure of User.courses
          if (foundUser.courses.includes(req.params.id)) { // find if the user is enrolled in that course
            return Course.findById(req.params.id)
          } else {
            throw new Error('User is not enrolled in this course')
          }
        })
        .then(foundCourse => {
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
