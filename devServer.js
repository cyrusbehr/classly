const path = require('path');
const express = require('express');
// const webpack = require('webpack');
// const config = require('./webpack.config.dev');
// const {randomColor} = require('./src/constants/algorithmicos');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const auth = require('./backend/routes/auth');
const create_course_class = require('./backend/routes/create_course_class');
const expressValidator = require('express-validator')
const { User } = require('./src/Models/models.js');
const dashboard = require('./backend/routes/dashboard');
const bcrypt = require('bcrypt');

const app = express();
// const compiler = webpack(config);

const host = 'http://localhost';
const port = process.env.PORT || 3000;


// app.use('/dist/', express.static(path.join(__dirname, 'dist')));
app.use('/', express.static(path.join(__dirname, 'public')));

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const mongoose = require('mongoose');
const models = require('./src/Models/models.js');
const Question = models.Question;
const Topic = models.Topic;
const Class = models.Class;
//double check mongoose.connect
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log('connected to database')
})

function randomize(array) {
  const randomDigit = Math.floor((Math.random() * array.length));
  const selected = array[randomDigit];
  return selected;
}

io.on('connection', socket => {
  console.log('Connected to socket');

//data = {
//   room: room access code
//}
  socket.on('join', (room) => {
    socket.join(room);
    console.log("user has joined", room);
    socket.currentRoom = room;
  });

  //No data needed for this emit event
  socket.on('disconnect', () => {
    socket.leave(socket.currentRoom);
    console.log("user has left");
  });

  socket.on('deleteQuestion', (data) => {
    Question.findByIdAndRemove(data.questionId, (err) => {
      Class.findById(data.reference, (err, classObj) => {
        let questionsArray = classObj.questions;
        let index;
        for(var i = 0; i < questionsArray.length; i++) {
          if(questionsArray[i].$oid === data.questionId){
            index = i;
            break;
          }
        }
        questionsArray.splice(index,1);
        classObj.questions = questionsArray;
        classObj.save();
        var deletedQuestionId = data.questionId;
        socket.broadcast.to(socket.currentRoom).emit('deleteQuestion', deletedQuestionId);
      })
    })
  })

  socket.on('deleteTopic', (data) => {
    Topic.findByIdAndRemove(data.topicId, (err) => {
      //now we must remove it from the class
      Class.findById(data.reference, (err, classObj) => {
        let topicsArray = classObj.topics;
        let index;
        for(var i = 0; i < topicsArray.length; i++) {
          if(topicsArray[i].$oid === data.topicId){
            index = i;
            break;
          }
        }
        topicsArray.splice(index,1);
        classObj.topics = topicsArray;
        classObj.save();
        var deletedTopicId = data.topicId;
        console.log("delete topic id", data.topicId);
        socket.broadcast.to(socket.currentRoom).emit('deleteTopic', deletedTopicId);
      })
    })
  })

  socket.on('generateQuestion', (data) => {
    const newQuestion = new Question ({
      text: data.text,
      firstname: data.firstname,
      lastname: data.lastname,
      userType: data.userType,
      tags: data.tags,
      email: data.email,
      referenceClass: data.referenceClass,
      isResolved: data.isResolved,
      isStarred: data.isStarred,
      upVotes: data.upVotes,
      timestamp: data.timestamp,
      color: data.color,
      comments: data.comments,
    })
    socket.broadcast.to(socket.currentRoom).emit('generateQuestion', newQuestion);
    socket.emit('generateQuestion', newQuestion);
    newQuestion.save((err, savedQuestion) => {
      if(err){
        console.log("Error saving newQuestion to database:", err);
      } else {
        Class.findById(newQuestion.referenceClass, (err, classObj) => {
          classObj.questions.push(savedQuestion._id);
          classObj.save()
        })
      }
    });
  })

  socket.on('generateTopic', (data) => {
    const newTopic = new Topic ({
      text: data.text,
      votes: data.votes,
      timestamp: data.timestamp,
      referenceClass: data.referenceClass,
      username: data.username,
      color: data.color,
      email: data.email,
    })
    socket.broadcast.to(socket.currentRoom).emit('generateTopic', newTopic);
    socket.emit('generateTopic', newTopic);

    newTopic.save((err, newTopic) => {
      if(err){
        console.log("Error saving newTopic to database:", err);
      } else {
        Class.findById(newTopic.referenceClass, (err, classObj) => {
          classObj.topics.push(newTopic._id);
          classObj.save()
        })
      }
    });
  })

  socket.on('createClass', (localState) => {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

    let accessCode = randomize(numbers) + randomize(letters) + randomize(numbers) + randomize(letters);

    function accessCodeRecursion(newAccessCode) {
      Class.findOne({accessCode: newAccessCode}, (err, classObj) => {
        if(!classObj){
          let newClass = new Class({
            professorName: localState.name,
            accessCode: newAccessCode,
            className: localState.title,
            timestamp: Date.now(),
            questions: [],
            topics: [],
          });
          newClass.save((err, newClass) => {
            if(err){
              console.log("Error creating newClass:", err);
            } else {
              // let newTopic = new Topic({
              //   text: "All Topics",
              //   votes: 0,
              //   timestamp: Date.now(),
              //   referenceClass: newClass._id,
              //   username: 'default_topic',
              //   isDefault: true
              // });
              Class.findById(newClass._id, (err, classObj) => {
                // classObj.topics.push(savedTopic._id);
                classObj.save()
                .then(() => {

                  socket.join(accessCode);
                  console.log("user has joined", accessCode);
                  socket.currentRoom = accessCode;
                  socket.emit("Joined", accessCode);
                  socket.emit('classCreated', newClass);
                  // socket.broadcast.to(socket.currentRoom).emit('newTopic', savedTopic);
                  // socket.emit('newTopic', savedTopic);
                  return null;
                })
              })
            }
          })
        } else {
           newAccessCode = randomize(numbers) + randomize(letters) + randomize(numbers) + randomize(letters);
           return accessCodeRecursion(newAccessCode);
          }
        }
      )
    }
    accessCodeRecursion(accessCode);
  });

  socket.on('newQuestion', (newQuestion) => {
    console.log(newQuestion);
    newQuestion.save((err, savedQuestion) => {
      if(err){
        console.log("Error saving newQuestion to database:", err);
      } else {
        Class.findById(newQuestion.referenceClass, (err, classObj) => {
          classObj.questions.push(savedQuestion._id);
          classObj.save()
        })
      }
    });
  });

  socket.on('newTopic', (newTopic) => {
    newTopic.save((err, newTopic) => {
      if(err){
        console.log("Error saving newTopic to database:", err);
      } else {
        Class.findById(newTopic.referenceClass, (err, classObj) => {
          classObj.topics.push(newTopic._id);
          classObj.save()
        })
      }
    });
  });


  socket.on('upVoteQuestion', (data) => {
    // console.log('upVoteQuestion Data: ', data);
    if(!data.toggle){
      let tempUpVote = data.previousUpVotes + 1;
      Question.findOneAndUpdate({_id: data.questionId}, { $set: { upVotes: tempUpVote}}, {new: true}, (err, updatedQuestion) => {
        if(err){
          console.log("Error upVoting question:", err);
        } else {
          // console.log("updated upVote question: ", updatedQuestion);
          socket.broadcast.to(socket.currentRoom).emit('upVoteQuestion', updatedQuestion);
          socket.emit('upVoteQuestion', updatedQuestion);
        }
      });
    } else {
      let tempUpVote = data.previousUpVotes - 1;
      Question.findOneAndUpdate({_id: data.questionId}, { $set: { upVotes: tempUpVote}}, {new: true}, (err, updatedQuestion) => {
        if(err){
          console.log("Error upVoting question:", err);
        } else {
          // console.log("updated upVote quesiton: ", updatedQuestion);
          socket.broadcast.to(socket.currentRoom).emit('upVoteQuestion', updatedQuestion);
          socket.emit('upVoteQuestion', updatedQuestion);
        }
      });
    }
  });

  socket.on('voteTopic', (data) => {
    if(!data.toggle){
      let tempUpVote = data.previousVotes + 1;
      Topic.findOneAndUpdate({_id: data.topicId}, { $set: { votes: tempUpVote}}, {new: true}, (err, updatedTopic) => {
        if(err){
          console.log("Error upVoting topic:", err);
        } else {
          // console.log('The updated topics is: ', updatedTopic)
          socket.broadcast.to(socket.currentRoom).emit('voteTopic', updatedTopic);
          socket.emit('voteTopic', updatedTopic);
        }
      });
    } else {
      let tempUpVote = data.previousVotes - 1;
      Topic.findOneAndUpdate({_id: data.topicId}, { $set: { votes: tempUpVote}}, {new: true}, (err, updatedTopic) => {
        if(err){
          console.log("Error upVoting topic:", err);
        } else {
          // console.log('The updated topics is: ', updatedTopic);
          socket.broadcast.to(socket.currentRoom).emit('voteTopic', updatedTopic);
          socket.emit('voteTopic', updatedTopic);
        }
      });
    }
  });

  socket.on('toggleStar', (data) => {
    let tempStarred = !data.isStarred;
    // console.log("toggleStar data:", data);
    Question.findOneAndUpdate({_id: data.questionId}, { $set: {isStarred: tempStarred}}, {new: true}, (err, updatedQuestion) => {
      if(err){
        console.log("Error starring question:", err);
      } else {
        // console.log("emmiting backend toggleStar updatedQuestion:", updatedQuestion);
        socket.broadcast.to(socket.currentRoom).emit('toggleStar', updatedQuestion);
        socket.emit('updatedQuestion', updatedQuestion);
      }
    });
  });

  socket.on('toggleResolve', (data) => {
    let tempResolved = !data.isResolved;
    Question.findOneAndUpdate({_id: data.questionId}, { $set: {isResolved: !data.isResolved}}, {new: true}, (err, updatedQuestion) => {
      if(err){
        console.log("Error resolving question:", err);
      } else {
        socket.broadcast.to(socket.currentRoom).emit('toggleResolve', updatedQuestion);
        // socket.emit('toggleResolve', updatedQuestion);
      }
    });
  });

  socket.on('getStudentState', (accessCode) => {
    Class.findOne({accessCode: accessCode})
    .populate('questions')
    .populate('topics')
    .then((classObj) => {
      if(classObj === null) {
        socket.emit('error1');
        console.log("Abort, we had an error 1");
      } else {
        socket.emit('getStudentState', classObj);
      }
    })
  })

  socket.on('newComment', (data) => {
    Question.findById(data.questionId, (err, questionObj) => {
      newComment = {
        text: data.text,
        creator: data.username,
        questionId: data.questionId
      };
      questionObj.comments.push(newComment);
      questionObj.save();

      socket.broadcast.to(socket.currentRoom).emit('newComment', newComment);
    })
  });
});

// AUTHENTICATION

app.use(bodyParser.json());

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      ,root = namespace.shift()
      ,formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
    };
  }
}));

app.use(cookieParser());
app.use(session({ secret: 'keyboard cat' }));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
  // Find the user with the given username
  User.findOne({ email: username }, function (err, user) {
    // if there's an error, finish trying to authenticate (auth failed)
    if (err) {
      console.log(err);
      return done(err);
    }
    // if no user present, auth failed
    if (!user) {
      console.log(user);
      return done(null, false, { message: 'Incorrect username.' });
    }

    if (bcrypt.compareSync(password, user.password)) {
      // auth has has succeeded
      return done(null, user);
    } else {
      return done(null, false, { message: 'Incorrect password.' });
    }
  });
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', auth(passport));
app.use('/api', create_course_class());

// app.use('/', function(req, res){
//   if(req.user){
//     res.redirect('/' + req.user.userType + '/dashboard')
//   } else {
//     next();
//   }
// })

app.use('/api', dashboard());

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

server.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.info('==> Listening on port %s. Open up %s:%s/ in your browser.', port, host, port);
});
