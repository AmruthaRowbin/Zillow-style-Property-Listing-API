
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');

const seedAdmin = async () => {
  await connectDB();
  const exists = await User.findOne({ email: 'admin@example.com' });

  if (!exists) {
    await User.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
    });
    console.log('Admin created');
  } else {
    console.log('Admin already exists');
  }

  mongoose.disconnect();
};

seedAdmin();
