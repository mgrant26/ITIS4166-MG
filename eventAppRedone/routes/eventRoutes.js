const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/auth');
const eventController = require('../controllers/eventController');
const validateObjectId = require('../middlewares/validateObjectId');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Define the route for creating a new event before routes with parameters
router.get('/new', ensureAuthenticated, eventController.renderNewEventForm);
router.post('/new', ensureAuthenticated, upload.single('image'), eventController.createNewEvent);

// Define routes that include ObjectId parameters
router.get('/:eventId', validateObjectId, eventController.getEventDetails);
router.get('/:eventId/edit', ensureAuthenticated, validateObjectId, eventController.renderEditEventForm);
router.post('/:eventId/edit', ensureAuthenticated, validateObjectId, eventController.updateEvent);
router.post('/:eventId/delete', ensureAuthenticated, validateObjectId, eventController.deleteEvent);

// Define the route for getting all events
router.get('/', eventController.getAllEvents);

module.exports = router;
