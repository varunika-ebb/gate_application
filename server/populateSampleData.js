const mongoose = require('mongoose');
const { populateSampleData } = require('./utils/sampleData');

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gate_quiz_app';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  return populateSampleData();
})
.then(() => {
  console.log('Sample data population completed successfully!');
  process.exit(0);
})
.catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
