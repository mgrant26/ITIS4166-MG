const mongoose = require('mongoose');

module.exports = (req, res, next) => {
  console.log(`Validating ObjectId for value: ${req.params.eventId}`);
  if (!mongoose.Types.ObjectId.isValid(req.params.eventId)) {
    return res.status(400).render('error', { title: '400 - Bad Request', error: 'Invalid ID format' });
  }
  next();
};
