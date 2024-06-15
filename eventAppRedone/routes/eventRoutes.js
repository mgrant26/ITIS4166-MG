const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const eventController = require('../controllers/eventController');
const validateObjectId = require('../middlewares/validateObjectId');

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

// Route to render the new event form
router.get('/new', eventController.renderNewEventForm);
router.post('/new', upload.single('image'), eventController.createNewEvent);

// Other routes
router.get('/', eventController.getAllEvents);
router.get('/:eventId', validateObjectId, eventController.getEventDetails);
router.get('/edit/:eventId', validateObjectId, eventController.renderEditEventForm);
router.post('/edit/:eventId', validateObjectId, upload.single('image'), eventController.updateEvent);
router.post('/delete/:eventId', validateObjectId, eventController.deleteEvent);

module.exports = router;
