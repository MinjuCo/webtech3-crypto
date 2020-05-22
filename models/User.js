const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
  firstname: String,
  lastname: String,
  coins: {
    type: mongoose.Types.Decimal128,
    required: true
  }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);