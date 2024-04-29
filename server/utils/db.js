const mongoose = require('mongoose');

const keys = require('../config/keys');
const { database } = keys;

const connectDB = async () => {
  try {
    await mongoose.connect(database.url);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};

module.exports = connectDB;
