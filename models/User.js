const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  firstname : String,
  lastname: String,
  picture: String,
  email: String
});

const User = mongoose.model('User', userSchema);
module.exports = User;