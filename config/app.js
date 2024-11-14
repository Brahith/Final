const express = require('express');
const path = require('path');
const taskRoutes = require('../routes/taskRoutes');

const app = express();

// Middleware to parse URL-encoded data (for form submissions)
app.use(express.urlencoded({ extended: true }));
// Middleware to parse JSON data (for JSON submissions)
app.use(express.json());

// Set EJS as the view engine
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Static files
app.use('/Content', express.static(path.join(__dirname, '../public/Content')));

// Routes
app.use('/', taskRoutes);

module.exports = app;
