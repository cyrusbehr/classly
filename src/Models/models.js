const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const ClassSchema = mongoose.Schema({
  professorName: String,
  accessCode: String,
  className: String,
  timestamp: Number,
  questions: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Question'
  }],
  topics: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Topics'
  }]
});

//reference is referance classSchema - done
//votes is upVotes - done
const QuestionSchema = mongoose.Schema({
  text: String,
  username: String,
  isResolved: Boolean,
  isStarred: Boolean,
  upVotes: Number,
  tags: Array,
  timestamp: Number,
  referenceClass: String,
});

const TopicSchema = mongoose.Schema({
  text: String,
  votes: Number,
  timestamp: Number,
  referenceClass: String,
});


const Class = mongoose.model('Class', ClassSchema);
const Question = mongoose.model('Question', QuestionSchema);
const Topics = mongoose.model('Topics', TopicSchema)

module.exports = {
  Class,
  Question,
  Topics,
}
