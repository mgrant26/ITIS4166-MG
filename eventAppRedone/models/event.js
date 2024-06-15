const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  startDateTime: {
    type: Date,
    required: true
  },
  endDateTime: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  host: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
