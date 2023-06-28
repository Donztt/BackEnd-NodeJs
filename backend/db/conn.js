const mongoose = require('mongoose');
require('dotenv').config();

async function main() {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGODB_CONNECTION_URL);

    console.log('DB Connected');
  } catch (error) {
    console.log('error: ', error);
  }
}

module.exports = main;
