const Event = require('../models/event');

// Display all events sorted by category
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    const categorizedEvents = {};

    events.forEach(event => {
      if (!categorizedEvents[event.category]) {
        categorizedEvents[event.category] = [];
      }
      categorizedEvents[event.category].push(event);
    });

    res.render('events', { categorizedEvents });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).render('error', { title: '500 - Internal Server Error', error });
  }
};

// Display event details
exports.getEventDetails = async (req, res) => {
  const eventId = req.params.eventId;
  console.log(`Fetching details for eventId: ${eventId}`);
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).render('404', { title: '404 - Not Found' });
    }
    res.render('event', { event });
  } catch (error) {
    console.error('Error fetching event details:', error);
    res.status(500).render('error', { title: '500 - Internal Server Error', error });
  }
};

// Render new event form
exports.renderNewEventForm = (req, res) => {
  res.render('newEvent');
};

// Create new event
exports.createNewEvent = async (req, res) => {
  const eventData = {
    title: req.body.title,
    category: req.body.category,
    details: req.body.details,
    startDateTime: req.body.startDateTime,
    endDateTime: req.body.endDateTime,
    location: req.body.location,
    host: req.body.host,
    image: `/uploads/${req.file.filename}`
  };
  console.log(`Creating new event with data: ${JSON.stringify(eventData)}`);
  try {
    const newEvent = await Event.create(eventData);
    console.log('New event created:', newEvent);
    res.redirect('/events');
  } catch (error) {
    console.error('Error creating new event:', error);
    res.status(500).render('error', { title: '500 - Internal Server Error', error });
  }
};

// Render edit event form
exports.renderEditEventForm = async (req, res) => {
  const eventId = req.params.eventId;
  console.log(`Fetching event for edit with eventId: ${eventId}`);
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).render('404', { title: '404 - Not Found' });
    }
    res.render('editEvent', { event });
  } catch (error) {
    console.error('Error fetching event for edit:', error);
    res.status(500).render('error', { title: '500 - Internal Server Error', error });
  }
};

// Update event
exports.updateEvent = async (req, res) => {
  const eventId = req.params.eventId;
  const updatedData = {
    title: req.body.title,
    category: req.body.category,
    details: req.body.details,
    startDateTime: req.body.startDateTime,
    endDateTime: req.body.endDateTime,
    location: req.body.location,
    host: req.body.host,
    image: req.file ? `/uploads/${req.file.filename}` : req.body.existingImage
  };
  console.log(`Updating event with eventId: ${eventId} with data: ${JSON.stringify(updatedData)}`);
  try {
    const updatedEvent = await Event.findByIdAndUpdate(eventId, updatedData, { new: true });
    if (!updatedEvent) {
      return res.status(404).render('404', { title: '404 - Not Found' });
    }
    res.redirect(`/events/${eventId}`);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).render('error', { title: '500 - Internal Server Error', error });
  }
};

// Delete event
exports.deleteEvent = async (req, res) => {
  const eventId = req.params.eventId;
  console.log(`Deleting event with eventId: ${eventId}`);
  try {
    const event = await Event.findByIdAndDelete(eventId);
    if (!event) {
      return res.status(404).render('404', { title: '404 - Not Found' });
    }
    res.redirect('/events');
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).render('error', { title: '500 - Internal Server Error', error });
  }
};
