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
  const { title, category, details, startDateTime, endDateTime, location, host } = req.body;
  const image = `/uploads/${req.file.filename}`;
  
  const start = new Date(startDateTime);
  const end = new Date(endDateTime);
  const duration = (end - start) / (1000 * 60 * 60);

  if (duration < 3) {
    return res.status(400).render('newEvent', { error: 'Event duration must be at least 3 hours.', title, category, details, startDateTime, endDateTime, location, host });
  }

  const eventData = { title, category, details, startDateTime, endDateTime, location, host, image };
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
  const { title, category, details, startDateTime, endDateTime, location, host } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : req.body.existingImage;

  const start = new Date(startDateTime);
  const end = new Date(endDateTime);
  const duration = (end - start) / (1000 * 60 * 60);

  if (duration < 3) {
    return res.status(400).render('editEvent', { error: 'Event duration must be at least 3 hours.', event: { _id: eventId, title, category, details, startDateTime, endDateTime, location, host, image } });
  }

  const updatedData = { title, category, details, startDateTime, endDateTime, location, host, image };
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
