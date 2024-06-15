const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const eventRoutes = require('./routes/eventRoutes');
const mainRoutes = require('./routes/mainRoutes');

const app = express();

// Replace with your actual MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://newUser1:12127125@itis4166-mg.36cqfy7.mongodb.net/?retryWrites=true&w=majority&appName=ITIS4166-MG';

mongoose.connect(mongoURI, {}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files before any other routes
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Log static file requests
app.use((req, res, next) => {
  if (req.url.startsWith('/js') || req.url.startsWith('/css') || req.url.startsWith('/images')) {
    console.log(`Serving static file: ${req.url}`);
  }
  next();
});

// Include routes
app.use('/', mainRoutes);
app.use('/events', eventRoutes);

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
