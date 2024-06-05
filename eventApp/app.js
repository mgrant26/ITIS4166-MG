const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const eventRoutes = require('./routes/eventRoutes');
const mainRoutes = require('./routes/mainRoutes');

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static('public'));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

// Dummy data for events
let events = [
    { category: 'Crab-Focused', name: 'Crab Meet and Greet' },
    { category: 'Crab-Focused', name: 'Horseshoe with Horseshoe Crabs' },
    { category: 'Crab-Focused', name: 'Dive In!' },
    { category: 'Lobster Crab-Focused', name: 'Lobster Party' },
    { category: 'Other Beautiful Crustaceans', name: 'Shrimp Soiree' }
];

// Include routes
app.use('/', mainRoutes);
app.use('/events', eventRoutes);

// Route to render events page with dynamic data
app.get('/events', (req, res) => {
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

// Route to handle new event creation form
app.get('/newEvent', (req, res) => {
    res.render('newEvent', { title: 'Create New Event' });
});

// Route to handle new event creation
app.post('/newEvent', upload.single('eventImage'), (req, res) => {
    const eventData = {
        name: req.body.eventName,
        category: req.body.category,
        startDateTime: req.body.eventDateTimeStart,
        endDateTime: req.body.eventDateTimeEnd,
        location: req.body.eventLocation,
        description: req.body.eventDescription,
        image: req.file ? `/uploads/${req.file.filename}` : null
    };

    // Save eventData to database or file
    // For example purposes, just log it
    console.log(eventData);

    // Add the new event to the events array
    events.push({ category: eventData.category, name: eventData.name });

    res.redirect('/events');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
