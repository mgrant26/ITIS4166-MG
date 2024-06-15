const mongoose = require('mongoose');
const Event = require('./models/event');

// Replace with your actual MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://newUser1:12127125@itis4166-mg.36cqfy7.mongodb.net/?retryWrites=true&w=majority&appName=ITIS4166-MG';

mongoose.connect(mongoURI, {}).then(() => {
  console.log('MongoDB connected');
  seedDatabase();
}).catch(err => console.error('MongoDB connection error:', err));

async function seedDatabase() {
  try {
    await Event.deleteMany({});
    const events = [
      {
        title: 'Crab Appreciation Day',
        category: 'Crab-Focused',
        details: 'A day to appreciate all things crab.',
        startDateTime: new Date('2024-06-15T10:00:00'),
        endDateTime: new Date('2024-06-15T12:00:00'),
        location: 'Beachside Park',
        host: 'Crustacean Lovers Society',
        image: '/uploads/crab1.png'
      },
      {
        title: 'Lobster Fest',
        category: 'Lobster-Focused',
        details: 'Celebrate lobsters with great food and fun.',
        startDateTime: new Date('2024-06-16T11:00:00'),
        endDateTime: new Date('2024-06-16T14:00:00'),
        location: 'Downtown Square',
        host: 'Seafood Enthusiasts',
        image: '/uploads/lobster1.png'
      },
      {
        title: 'Crustacean Carnival',
        category: 'Other Beautiful Crustaceans',
        details: 'A carnival for all beautiful crustaceans.',
        startDateTime: new Date('2024-06-17T09:00:00'),
        endDateTime: new Date('2024-06-17T17:00:00'),
        location: 'City Park',
        host: 'Marine Life Lovers',
        image: '/uploads/carnival1.png'
      }
    ];
    await Event.insertMany(events);
    console.log('Database seeded');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}
