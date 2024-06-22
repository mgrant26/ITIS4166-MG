const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Event = require('../models/event');

// Render signup form
exports.renderSignupForm = (req, res) => {
  res.render('signup');
};

// Handle signup
exports.signup = async (req, res) => {
  const { firstName, lastName, email, password, password2 } = req.body;
  let errors = [];

  if (!firstName || !lastName || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 8) {
    errors.push({ msg: 'Password must be at least 8 characters' });
  }

  if (errors.length > 0) {
    res.render('signup', {
      errors,
      firstName,
      lastName,
      email,
      password,
      password2
    });
  } else {
    try {
      const existingUser = await User.findOne({ email: email.toLowerCase() });

      if (existingUser) {
        errors.push({ msg: 'Email already exists' });
        res.render('signup', {
          errors,
          firstName,
          lastName,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          firstName,
          lastName,
          email: email.toLowerCase(),
          password
        });

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        await newUser.save();

        req.flash('success_msg', 'You are now registered and can log in');
        res.redirect('/users/login');
      }
    } catch (err) {
      console.error(err);
      res.status(500).render('error', { title: '500 - Internal Server Error', error: err });
    }
  }
};

// Render login form
exports.renderLoginForm = (req, res) => {
  res.render('login');
};

// Handle login
exports.login = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
};

// Handle logout
exports.logout = (req, res) => {
  req.logout(err => {
    if (err) {
      return next(err);
    }
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });
};

// Render profile page
exports.getProfile = async (req, res) => {
  try {
    const events = await Event.find({ user: req.user.id });
    res.render('profile', {
      user: req.user,
      events: events
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { title: '500 - Internal Server Error', error: err });
  }
};
