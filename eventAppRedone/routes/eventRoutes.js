const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/auth');
const eventController = require('../controllers/eventController');
const validateObjectId = require('../middlewares/validateObjectId');

router.get('/', eventController.getAllEvents);
router.get('/:eventId', validateObjectId, eventController.getEventDetails);
router.get('/new', ensureAuthenticated, eventController.renderNewEventForm);
router.post('/new', ensureAuthenticated, eventController.createNewEvent);
router.get('/:eventId/edit', ensureAuthenticated, validateObjectId, eventController.renderEditEventForm);
router.post('/:eventId/edit', ensureAuthenticated, validateObjectId, eventController.updateEvent);
router.post('/:eventId/delete', ensureAuthenticated, validateObjectId, eventController.deleteEvent);

module.exports = router;
