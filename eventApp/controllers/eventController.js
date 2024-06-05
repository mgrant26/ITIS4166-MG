const events = require('../data/events');

// Controller for rendering the events page
exports.renderEventsPage = (req, res) => {
    // Group events by category
    const categorizedEvents = {};
    events.forEach(event => {
        if (!categorizedEvents[event.category]) {
            categorizedEvents[event.category] = [];
        }
        categorizedEvents[event.category].push(event);
    });

    res.render('events', { categorizedEvents });
};
