var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  category: String,
  checkstatus: {type: Number, default: 0}
});

mongoose.model('User', UserSchema);