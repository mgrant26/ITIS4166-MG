const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userController');
const { ensureAuthenticated } = require('../middlewares/auth');

// Signup route
router.get('/signup', userController.renderSignupForm);
router.post('/signup', userController.signup);

// Login route
router.get('/login', userController.renderLoginForm);
router.post('/login', userController.login);

// Logout route
router.get('/logout', ensureAuthenticated, userController.logout);

// Profile route
router.get('/profile', ensureAuthenticated, userController.getProfile);

module.exports = router;
