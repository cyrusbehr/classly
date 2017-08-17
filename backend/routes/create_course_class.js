const express = require('express');
const router = express.Router();
const { Course, Class, User } = require('../../src/Models/models');
const util = require('util');

function randomize(array) {
  const randomDigit = Math.floor((Math.random() * array.length));
  const selected = array[randomDigit];
  return selected;
}

module.exports = function() {
  router.post('/create/course', function(req, res){
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    let accessCode = '0n9u';

    function accessCodeRecursion(newAccessCode) {
      console.log('sdsdsdsdsdsdsdsd', newAccessCode);
      Course.findOne({accessCode: newAccessCode}, (err, courseObj) => {
        if(!courseObj){
          req.checkBody('courseTitle', 'Course title cannot be empty').notEmpty();
          req.checkBody('courseCode', 'Course code cannot be empty').notEmpty();
        req.getValidationResult()
        .then(function(result){
          // if (!result.isEmpty()) { // Error in the validations above
          //   res.json({
          //     error: util.inspect(result.array())
          //   });
          //   return;
          }
          const newCourse = new Course({
            professorName: "Prof: " + req.user.lastname,
            courseTitle: req.body.courseTitle,
            accessCode: newAccessCode,
            courseCode: req.body.courseCode,
            classes:[]
          });
          return newCourse.save()
          .then(function(savedNewCourse){
            return Promise.all([User.findById(req.user._id), savedNewCourse]);
          })
          .then(function(values){
              values[0].courses.push(values[1]._id)
              values[0].save()
              res.json({
                error: null,
                response: values[1]
              })
              return null;
            })
            .catch(function(error){
              res.json({
                error
              })
            })
        })
      } else {
        newAccessCode = randomize(numbers) + randomize(letters) + randomize(numbers) + randomize(letters);
        return accessCodeRecursion(newAccessCode);
      }
      })
    }
    accessCodeRecursion(accessCode);
  })

  router.post('/create/class', function(req, res){
    req.checkBody('className', 'Class name cannot be empty').notEmpty();
    req.checkBody('courseReference', 'Course reference cannot be empty').notEmpty();
    var d = new Date();
    req.getValidationResult()
    .then(function(result){
      console.log(result);
      if (!result.isEmpty()) { // Error in the validations above
        // res.json({
        //   error: util.inspect(result.array())
        // });
        // return;
      }
      const newClass = new Class({
        professorName: "Prof: " + req.user.lastname,
        className: req.body.classTitle,
        timestamp: d.getTime(),
        questions: [],
        topics:[],
        courseReference: req.body.courseReference
      });
      return newClass.save();
    })
    .then(function(savedClass){
      Course.findById(req.body.courseReference)
      .then(function(foundCourse){
        foundCourse.classes.push(savedClass._id)
        foundCourse.save()
        res.json({
          error: null,
          response: savedClass
        })
      })
      .catch(function(error){
        res.json({
          error
        })
      })
    })
  })
  return router;
}
