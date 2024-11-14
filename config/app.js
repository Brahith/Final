const express = require('express');
const path = require('path');
const taskRoutes = require('../routes/taskRoutes');

const app = express();

// Set EJS as the view engine
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Static files
app.use('/Content', express.static(path.join(__dirname, '../public/Content')));

// Routes
app.use('/', taskRoutes);

module.exports = app;
