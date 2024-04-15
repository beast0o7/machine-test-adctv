const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number! Please use XXX-XXX-XXXX format.`
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /\S+@\S+\.\S+/.test(v); // Basic email format validation
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  address: {
    type: Array
  },
  dob: {
    type: Date,
    required: true
  },
});

const User = mongoose.model('users', userSchema);

module.exports = User;
