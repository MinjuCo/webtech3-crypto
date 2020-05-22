const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const transferSchema = new Schema({
  sender: String,
  receiver: {
    type: String,
    required: true
  },
  reason: String,
  message: String,
  coins: {
    type: mongoose.Types.Decimal128,
    required: true
  },
  date: Date
});

const Transfer = mongoose.model('Transfer', transferSchema);

module.exports = Transfer;