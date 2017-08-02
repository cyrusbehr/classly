const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev');

const app = express();
const compiler = webpack(config);

const host = 'http://localhost';
const port = process.env.npm_config_port ? process.env.npm_config_port : 3000;

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const mongoose = require('mongoose');
const models = require('./src/models/models.js');
const Question = models.Question;
const Topic = models.Topic;
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
  socket.on('newQuestion', (data) = {
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
    newQuestion.save(function(err, newQuestion){
      if(err){
        console.log("Error saving newQuestion to database:", err);
      } else {
        socket.broadcast.to(socket.currentRoom).emit('newQuestion', newQuestion);
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
    newTopic.save(function(err, newTopic){
      if(err){
        console.log("Error saving newTopic to database:", err);
      } else {
        socket.broadcast.to(socket.currentRoom).emit('newQuestion', newQuestion);
      }
    });
  });

  //data = {
  //questionId: question._id,
  //previousUpVotes: question.upVotes
  //}
  //really only need to know the id, but being passed the previousUpVotes makes code cleaner, if findOneAndUpdate works (tbd)
  socket.on('upVoteQuestion', (data) => {
    Question.findOneAndUpdate({._id: data.questionId}, { $set: { upVotes: data.previousUpVotes + 1}}, {new: true}, function(err, updatedQuestion){
      if(err){
        console.log("Error upVoting question:", err);
      } else {
        socket.broadcast.to(socket.currentRoom).emit('upVoteQuestion', updatedQuestion);
      }
    });
  });

  //More sockets to come:
  //voteTopic
  //taStar
  //Question Resolved

});

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(port, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.info('==> Listening on port %s. Open up %s:%s/ in your browser.', port, host, port);
});
