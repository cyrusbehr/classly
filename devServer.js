const path = require('path');
const express = require('express');
// const webpack = require('webpack');
// const config = require('./webpack.config.dev');

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

io.on('connection', socket => {

//data = {
//   room: room access code
//}
  socket.on('join', (room) => {
    socket.join(room);
    console.log("user has joined", room);
    socket.currentRoom = room;
    socket.emit("Joined", room);
  });

  //No data needed for this emit event
  socket.on('disconnect', () => {
    socket.leave(socket.currentRoom);
    console.log("user has left");
  });

  socket.on('deleteQuestion', (data) => {
    Question.findByIdAndRemove(data.questionId, (err) => {
      //now we must remove it from the class
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

  socket.on('createClass', (localState) => {
    let nameArr = localState.name.split(" ");
    let str = nameArr[0].concat(localState.title.replace(/ /g,''));
    let newClass = new Class({
      professorName: localState.name,
      accessCode: str.toLowerCase(),
      className: localState.title,
      timestamp: Date.now(),
      questions: [],
      topics: [],
    });
    newClass.save((err, newClass) => {
      if(err){
        console.log("Error creating newClass:", err);
      } else {
        socket.emit('classCreated', newClass);
      }
    })
  });

  socket.on('newQuestion', (data) => {
    var newQuestion = new Question({
      text: data.text,
      username: data.username,
      userType: data.userType,
      isResolved: data.isResolved || false,
      isStarred: data.isStarred || false,
      upVotes: data.upVotes || 0,
      tags: data.tags,
      timestamp: Date.now(),
      referenceClass: data.referenceClass
    });
    newQuestion.save((err, savedQuestion) => {
      if(err){
        console.log("Error saving newQuestion to database:", err);
      } else {
        Class.findById(data.referenceClass, (err, classObj) => {
          classObj.questions.push(savedQuestion._id);
          classObj.save()
          .then(() => {
            //check to see if the topic is empty or already exists
            if(data.tags === "" || data.isUniqueTopic === false){
              socket.broadcast.to(socket.currentRoom).emit('newQuestion', savedQuestion);
              socket.emit('newQuestion', savedQuestion);
            }else{
            let newTopic = new Topic({
              text: data.tags,
              votes: 0,
              timestamp: Date.now(),
              referenceClass: data.referenceClass,
              username: data.username,
            });
            newTopic.save((err, savedTopic) => {
              if(err){
                console.log("Error saving savedTopic to database:", err);
              } else {
                Class.findById(data.referenceClass, (err, classObj) => {
                  classObj.topics.push(savedTopic._id);
                  classObj.save()
                  .then(() => {
                    socket.broadcast.to(socket.currentRoom).emit('newQuestion', savedQuestion);
                    socket.emit('newQuestion', savedQuestion);
                    socket.broadcast.to(socket.currentRoom).emit('newTopic', savedTopic);
                    socket.emit('newTopic', savedTopic);
                  })
                })
              }
            });
          }
          })
        })
      }
    });
  });

  // socket.on('newTopic', (data) => {
  //   let newTopic = new Topic({
  //     text: data.text,
  //     votes: data.votes,
  //     timestamp: data.timestamp,
  //     referenceClass: data.referenceClass,
  //     username: data.username,
  //     slideNumber: data.slideNumber
  //   });
  //   newTopic.save((err, newTopic) => {
  //     if(err){
  //       console.log("Error saving newTopic to database:", err);
  //     } else {
  //       Class.findById(data.referenceClass, (err, classObj) => {
  //         classObj.topics.push(newTopic._id);
  //         classObj.save()
  //         .then(() => {
  //           socket.broadcast.to(socket.currentRoom).emit('newTopic', newTopic);
  //           socket.emit('newTopic', newTopic);
  //         })
  //       })
  //     }
  //   });
  // });


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
      if(!classObj) {
        socket.emit('error1');
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
  })

});

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
