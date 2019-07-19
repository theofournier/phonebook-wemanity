const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  dateAdd: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false })

module.exports = Contact = mongoose.model('contact', ContactSchema);
