const express = require('express');
const router = express.Router();
const multer = require('multer');

// Route to render the home page
router.get('/', (req, res) => {
    res.render('index');
});

// Route to render the new event creation form
router.get('/newEvent', (req, res) => {
    res.render('newEvent', { title: 'Create New Event' });
});

// Route to handle new event creation
router.post('/newEvent', multer().single('eventImage'), (req, res) => {
    const { eventName, category } = req.body;
    events.push({ category, name: eventName });
    res.redirect('/events');
});

module.exports = router;
