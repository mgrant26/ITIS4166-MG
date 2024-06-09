const express = require('express');
const router = express.Router();

// Import the events array from the eventData module
const { events } = require('../models/eventData');

router.get('/events', (req, res) => {
    // Group events by category
    const categorizedEvents = {};
    events.forEach(event => {
        if (!categorizedEvents[event.category]) {
            categorizedEvents[event.category] = [];
        }
        categorizedEvents[event.category].push(event);
    });

    res.render('events', { categorizedEvents });
});

router.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

router.get('/newEvent', (req, res) => {
    res.render('newEvent', { title: 'Create New Event' });
});

module.exports = router;
