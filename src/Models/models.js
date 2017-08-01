const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)

const ClassSchema = mongoose.Schema({
  professorName: String,
  accessCode: String,
  className: String,
  timestamp: Number,
  questions: {
    type: mongoose.Schema.ObjectId,
    ref: 'Questions'
  },
  topics: {
    type: mongoose.Schema.ObjectId,
    ref: 'Topics'
  }
});

const QuestionSchema = mongoose.Schema({
  text: String,
  username: String,
  isResolved: Boolean,
  isStarred: Boolean,
  votes: Number,
  tags: Array,
  timestamp: Number,
  reference: String,
});

const TopicSchema = mongoose.Schema({
  text: String,
  votes: Number,
  timestamp: Number,
  reference: String,
});


const Class = mongoose.model('Class', ClassSchema);
const Questions = mongoose.model('Questions', QuestionSchema);
const Topics = mongoose.model('Topics', TopicSchema)

module.exports = {
  Class,
  Questions,
  Topics,
}
