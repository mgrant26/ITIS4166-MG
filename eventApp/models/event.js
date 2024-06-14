const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: String,
    category: String,
    startDateTime: String,
    endDateTime: String,
    location: String,
    description: String,
    image: String
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
