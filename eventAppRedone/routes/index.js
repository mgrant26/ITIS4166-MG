const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const eventController = require('../controllers/eventController');
const { ensureAuthenticated } = require('../middlewares/auth');

router.get('/', (req, res) => res.render('index'));
router.get('/signup', userController.renderSignupForm);
router.post('/signup', userController.signup);
router.get('/login', userController.renderLoginForm);
router.post('/login', userController.login);
router.get('/logout', ensureAuthenticated, userController.logout);
router.get('/profile', ensureAuthenticated, userController.renderProfile);

router.get('/events', eventController.getAllEvents);
router.get('/events/new', ensureAuthenticated, eventController.renderNewEventForm);
router.post('/events/new', ensureAuthenticated, eventController.createNewEvent);
router.get('/events/:eventId', eventController.getEventDetails);
router.get('/events/edit/:eventId', ensureAuthenticated, eventController.renderEditEventForm);
router.post('/events/edit/:eventId', ensureAuthenticated, eventController.updateEvent);
router.post('/events/delete/:eventId', ensureAuthenticated, eventController.deleteEvent);

module.exports = router;
