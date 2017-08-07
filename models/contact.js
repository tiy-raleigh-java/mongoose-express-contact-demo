const mongoose = require('mongoose');

// get a reference to Schema
const Schema = mongoose.Schema;

// create a schema for a contact
const contactSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  emailAddress: { type: String },
  homePhone: { type: String },
  mobilePhone: { type: String, required: true }
});

// create a model for a Contact
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
