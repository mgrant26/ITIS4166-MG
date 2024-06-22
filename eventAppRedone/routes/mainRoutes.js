const express = require('express');
const router = express.Router();
const path = require('path');

// Serve static files
router.use('/js', express.static(path.join(__dirname, '../public/js')));
router.use('/css', express.static(path.join(__dirname, '../public/css')));
router.use('/images', express.static(path.join(__dirname, '../public/images')));

// Render the index page
router.get('/', (req, res) => {
  console.log('Rendering index page');
  res.render('index');
});

router.get('/index', (req, res) => {
  res.render('index');
});

module.exports = router;
