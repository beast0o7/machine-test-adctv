const mongoose = require('mongoose');

const loggerSchema = new mongoose.Schema({
  ipAddress: {
    type: String,
    // required: true
  },
  deviceType: {
    type: String,
    // required: true
  },
  browser: {
    type: String,
    // required: true
  },
  userAgent: {
    type: String,
    // required: true
  }
});

const Log = mongoose.model('logs', loggerSchema);

module.exports = Log;
