const Event = require('../models/event');

// Controller function to render all events sorted by category
exports.getAllEvents = (req, res) => {
    Event.find({}, (err, events) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

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
};

// Controller function to render event details
exports.getEventDetails = (req, res) => {
    const eventId = req.params.id;
    Event.findById(eventId, (err, event) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.render('event', { event });
    });
};