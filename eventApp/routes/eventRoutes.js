const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Event = require('../models/event'); // Ensure this path is correct

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

// Route to handle new event creation
router.post('/newEvent', upload.single('eventImage'), async (req, res) => {
    const eventData = {
        name: req.body.name,
        category: req.body.category,
        startDateTime: req.body.startDateTime,
        endDateTime: req.body.endDateTime,
        location: req.body.location,
        description: req.body.description,
        image: `/uploads/${req.file.filename}`
    };
    try {
        // Save the event to the database
        const newEvent = await Event.create(eventData);
        console.log('New event created:', newEvent);
        res.redirect('/events');
    } catch (error) {
        console.error('Error creating new event:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to handle requests for a specific event
router.get('/events/:eventId', async (req, res) => {
    const eventId = req.params.eventId;
    try {
        // Find the event with the given eventId in the database
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).send('Event not found');
        }
        // Render the event page with the event data
        res.render('event', { event });
    } catch (error) {
        console.error('Error retrieving event:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
