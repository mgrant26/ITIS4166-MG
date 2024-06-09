const multer = require('multer');
const path = require('path');
const events = require('../data/events');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Controller for rendering the new event creation form
exports.renderNewEventForm = (req, res) => {
    res.render('newEvent', { title: 'Create New Event' });
};

// Controller for handling new event creation
exports.createNewEvent = (req, res) => {
    const eventData = {
        name: req.body.eventName,
        category: req.body.category,
        startDateTime: req.body.eventDateTimeStart,
        endDateTime: req.body.eventDateTimeEnd,
        location: req.body.eventLocation,
        description: req.body.eventDescription,
        image: req.file ? `/uploads/${req.file.filename}` : null
    };

    const event = new Event(eventData);
    event.save((err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.redirect('/events');
    });
    
    // Save eventData to database or file
    // For example purposes, just log it
    console.log(eventData);

    // Add the new event to the events array
    events.push({ category: eventData.category, name: eventData.name });

    res.redirect('/events');
};
