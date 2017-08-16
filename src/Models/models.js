const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const ClassSchema = mongoose.Schema({
  professorName: String,
  className: String,
  timestamp: Number,
  questions: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Question'
  }],
  topics: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Topics'
  }],
  courseReference: String,
});

//reference is referance classSchema - done
//votes is upVotes - done
const QuestionSchema = mongoose.Schema({
  text: String,
  username: String,
  userType: String,
  isResolved: Boolean,
  isStarred: Boolean,
  upVotes: Number,
  tags: Array,
  timestamp: Number,
  referenceClass: String,
  comments: Array,
  color: String
});

const TopicSchema = mongoose.Schema({
  username: String,
  userType: String,
  text: String,
  votes: Number,
  timestamp: Number,
  referenceClass: String,
  isDefault: Boolean,
  color: String
});

const CourseSchema = mongoose.Schema({
  professorName: String,
  courseTitle: String,
  accessCode: String,
  courseCode: String,
  classes: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Class'
})

const userSchema = Schema({
  firstname:{
    type: String,
    required: true
  },
  lastname:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  courses:[{
    type: mongoose.Schema.ObjectId,
    ref: 'Course'
  }]
});

const Course = mongoose.model('Course', CourseSchema);
const Class = mongoose.model('Class', ClassSchema);
const Question = mongoose.model('Question', QuestionSchema);
const Topic = mongoose.model('Topics', TopicSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
  Class,
  Question,
  Topic,
  Course
}
