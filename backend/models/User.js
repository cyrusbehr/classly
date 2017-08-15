var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URI);

var userSchema = Schema({
  username:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  }
});

module.exports = {
  User: mongoose.model('User', userSchema)
};
