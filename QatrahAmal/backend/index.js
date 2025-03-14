require('dotenv').config();

// Connect to the database
const connectDB = require('./config/db');
connectDB();

// Import and run the Express app
require('./app');
