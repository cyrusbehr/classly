const path = require('path');
const express = require('express');
// const webpack = require('webpack');
// const config = require('./webpack.config.dev');

const app = express();
// const compiler = webpack(config);

const host = 'http://localhost';
const port = process.env.npm_config_port ? process.env.npm_config_port : 3000;


app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/', express.static(path.join(__dirname, 'public')));

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const mongoose = require('mongoose');
const models = require('./src/models/models.js');
const Question = models.Question;
const Topic = models.Topic;
const Class = models.Class;
//double check mongoose.connect
mongoose.connect(process.env.MONGODB_URI);

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

// data = {
//   text: String,
//   username: String,
//   isResolved: Boolean,
//   isStarred: Boolean,
//   votes: Number,
//   tags: Array,
//   timestamp: Number,
//   reference: String,
// }
  socket.on('createClass', (localState) => {
    console.log("socket create class");
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
    let newQuestion = new Question({
      text: data.text,
      username: data.username,
      isResolved: data.isResolved,
      isStarred: data.isStarred,
      upVotes: data.upVotes,
      tags: data.tags,
      timestamp: data.timestamp,
      reference: data.referenceClass
    });
    newQuestion.save((err, newQuestion) => {
      if(err){
        console.log("Error saving newQuestion to database:", err);
      } else {
        socket.broadcast.to(socket.currentRoom).emit('newQuestion', newQuestion);
        socket.emit('newQuestion', newQuestion);
      }
    });
  });

  //   data = {
  //   text: String,
  //   votes: Number,
  //   timestamp: Number,
  //   reference: String,
  // }
  socket.on('newTopic', (data) => {
    let newTopic = new Topic({
      text: data.text,
      votes: data.votes,
      timestamp: data.timestamp,
      referenceClass: data.referenceClass,
    });
    newTopic.save((err, newTopic) => {
      if(err){
        console.log("Error saving newTopic to database:", err);
      } else {
        socket.broadcast.to(socket.currentRoom).emit('newQuestion', newQuestion);
        socket.emit('newTopic', newTopic);
      }
    });
  });

  //data = {
  //questionId: question._id,
  //previousUpVotes: question.upVotes
  //}
  //really only need to know the id, but being passed the previousUpVotes makes code cleaner, if findOneAndUpdate works (tbd)
  socket.on('upVoteQuestion', (data) => {
    let tempUpVote = data.previousUpVotes + 1;
    Question.findOneAndUpdate({_id: data.questionId}, { $set: { upVotes: tempUpVote}}, {new: true}, (err, updatedQuestion) => {
      if(err){
        console.log("Error upVoting question:", err);
      } else {
        socket.broadcast.to(socket.currentRoom).emit('upVoteQuestion', updatedQuestion);
        socket.emit('updatedQuestion', updatedQuestion);
      }
    });
  });

  //data = {
  //topicId = topic._id,
  //previousTopicVotes: topic.votes
  //}
  socket.on('voteTopic', (data) => {
    let tempVote = data.previousTopicVotes + 1;
    Topic.findOneAndUpdate({_id: data._id}, { $set: {votes: tempVote}}, {new: true}, (err, updatedTopic) => {
      if(err){
        console.log("Error voting on topic", err);
      } else {
        socket.broadcast.to(socket.currentRoom).emit('voteTopic', updatedTopic);
        socket.emit('updatedTopic', updatedTopic);
      }
    });
  });

  //data = {
  //  questionId: question._id,
  //  isStarred: question.isStarred
  //}
  socket.on('toggleStar', (data) => {
    let tempStarred = !data.isStarred;
    Question.findOneAndUpdate({_id: data._id}, { $set: {isStarred: tempStarred}}, {new: true}, (err, updatedQuestion) => {
      if(err){
        console.log("Error starring question:", err);
      } else {
        socket.broadcast.to(socket.currentRoom).emit('toggleStar', updatedQuestion);
        socket.emit('updatedQuestion', updatedQuestion);
      }
    });
  });

  //data = {
  //questionId: question._id,
  //isStarred: question.isStarred
  //}
  socket.on('toggleResolved', (data) => {
    let tempResolved = !data.isResolved;
    Question.findOneAndUpdate({_id: data._id}, { $set: {isResolved: !data.isResolved}}, {new: true}, (err, updatedQuestion) => {
      if(err){
        console.log("Error resolving question:", err);
      } else {
        socket.broadcast.to(socket.currentRoom).emit('toggleResolved', updatedQuestion);
        socket.emit('toggleResolved', updatedQuestion);
      }
    });
  });

});

// app.use(require('webpack-dev-middleware')(compiler, {
//   noInfo: true,
//   publicPath: config.output.publicPath
// }));


// app.use(require('webpack-dev-middleware')(compiler, {
//   noInfo: true,
//   publicPath: config.output.publicPath
// }));
//
// app.use(require('webpack-hot-middleware')(compiler));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

server.listen(port, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.info('==> Listening on port %s. Open up %s:%s/ in your browser.', port, host, port);
});
