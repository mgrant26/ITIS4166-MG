const express = require('express');
const router = express.Router();

// Dummy data for events
let events = [
    { category: 'Crab-Focused', name: 'Crab Meet and Greet' },
    { category: 'Crab-Focused', name: 'Horseshoe with Horseshoe Crabs' },
    { category: 'Crab-Focused', name: 'Dive In!' },
    // Add more initial events as needed
];

// Route to render the events page
router.get('/', (req, res) => {
    res.render('events', { events });
});

module.exports = router;
