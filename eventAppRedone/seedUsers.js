const mongoose = require('mongoose');
const User = require('./models/user');

// Replace with your actual MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://newUser1:12127125@itis4166-mg.36cqfy7.mongodb.net/?retryWrites=true&w=majority&appName=ITIS4166-MG';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const seedUsers = async () => {
  try {
    await User.deleteMany({});
    await User.create([
      { firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'password123' },
      { firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com', password: 'password123' },
    ]);
    console.log('Users seeded');
    mongoose.connection.close();
  } catch (error) {
    console.error(error);
    mongoose.connection.close();
  }
};

seedUsers();
