const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Passport config
require('./config/passport')(passport);

const app = express();

// Connect to MongoDB
const mongoURI = 'mongodb+srv://newUser1:12127125@itis4166-mg.36cqfy7.mongodb.net/?retryWrites=true&w=majority&appName=ITIS4166-MG';
mongoose.connect(mongoURI).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Log static file requests
app.use((req, res, next) => {
  if (req.url.startsWith('/js') || req.url.startsWith('/css') || req.url.startsWith('/images')) {
    console.log(`Serving static file: ${req.url}`);
  }
  next();
});

// Use Routes
app.use('/users', userRoutes);
app.use('/events', eventRoutes);
app.use('/', (req, res) => res.render('index'));  // This ensures the index page renders without needing index.js

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).render('404', { title: '404 - Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { title: '500 - Internal Server Error', error: err });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
