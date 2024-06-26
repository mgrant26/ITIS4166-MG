const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/auth');
const eventController = require('../controllers/eventController');
const validateObjectId = require('../middlewares/validateObjectId');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Define the route for getting all events
router.get('/', eventController.getAllEvents);

// Define the route for creating a new event before routes with parameters
router.get('/new', ensureAuthenticated, eventController.renderNewEventForm);
router.post('/new', ensureAuthenticated, upload.single('image'), eventController.createNewEvent);

// Define routes that include ObjectId parameters
router.get('/:eventId', validateObjectId, eventController.getEventDetails);
router.get('/edit/:eventId', ensureAuthenticated, validateObjectId, eventController.renderEditEventForm);
router.post('/edit/:eventId', ensureAuthenticated, validateObjectId, eventController.updateEvent);
router.post('/delete/:eventId', ensureAuthenticated, validateObjectId, eventController.deleteEvent);



module.exports = router;
