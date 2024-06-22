const mongoose = require('mongoose');
const Event = require('./models/event');

const mongoURI = 'mongodb+srv://newUser1:12127125@itis4166-mg.36cqfy7.mongodb.net/?retryWrites=true&w=majority&appName=ITIS4166-MG';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    seedDatabase();
  })
  .catch(err => console.error('MongoDB connection error:', err));

async function seedDatabase() {
  const userId = '6676f839686e365d47573444'; // ObjectId of michaelelgrant@gmail.com

  const events = [
    {
      title: 'Crab Appreciation Day',
      category: 'Crab-Focused',
      details: 'A day to appreciate all things crab.',
      startDateTime: new Date('2024-06-15T14:00:00'),
      endDateTime: new Date('2024-06-15T17:00:00'),
      location: 'Beachside Park',
      host: 'michaelelgrant@gmail.com',
      image: '/uploads/crab1.jpg',
      user: userId
    },
    {
      title: 'Lobster Festival',
      category: 'Lobster-Focused',
      details: 'Celebrating the king of crustaceans.',
      startDateTime: new Date('2024-07-20T10:00:00'),
      endDateTime: new Date('2024-07-20T18:00:00'),
      location: 'Harbor Square',
      host: 'michaelelgrant@gmail.com',
      image: '/uploads/lobster1.jpg',
      user: userId
    },
    {
      title: 'Shrimp Boil Bonanza',
      category: 'Other Beautiful Crustaceans',
      details: 'Join us for a delicious shrimp boil.',
      startDateTime: new Date('2024-08-05T12:00:00'),
      endDateTime: new Date('2024-08-05T15:00:00'),
      location: 'Community Center',
      host: 'michaelelgrant@gmail.com',
      image: '/uploads/shrimp1.jpg',
      user: userId
    }
  ];

  try {
    await Event.deleteMany({});
    await Event.insertMany(events);
    console.log('Database seeded');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
  }
}
