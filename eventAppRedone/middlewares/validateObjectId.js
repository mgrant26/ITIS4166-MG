const mongoose = require('mongoose');

module.exports = function(req, res, next) {
    if (mongoose.Types.ObjectId.isValid(req.params.eventId)) {
        return next();
    }
    return res.status(400).render('error', { title: '400 - Bad Request', error: 'Invalid ObjectId' });
};
