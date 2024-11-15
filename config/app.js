const express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let app = express();

let taskRoutes = require('../routes/taskRoutes');

let cors = require('cors')
// Create user model instance
let userModel = require('../model/User');
let User = userModel.User;

// Middleware to parse URL-encoded data (for form submissions)
app.use(express.urlencoded({ extended: true }));
// Middleware to parse JSON data (for JSON submissions)
app.use(express.json());

// Set EJS as the view engine
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
let session = require('express-session')
let passport = require('passport')
let passportLocal = require('passport-local')
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

// Getting-started.js
const mongoose = require('mongoose');
let DB = require ('./db')
// point mongoose to the DB URI
mongoose.connect (DB.URI);
let mongoDB = mongoose.connection;
mongoDB.on('error',console.error.bind(console,'Connection Error'));
mongoDB.once('open',()=>{
    consolde.log("Connected with the MongoDB")
});
mongoose.connect(DB.URI,{useNewURIParser:true,useUnifiedTopology:true})

// set up express-session
app.use(session({
    secret:"SomeSecret",
    saveUninitialized: false,
    resave:false
}))

// Initialize the flash
app.use(flash());

// Serealize and Deserealize the user the information
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Static files
app.use('/Content', express.static(path.join(__dirname, '../public/Content')));

// Routes
app.use('/', taskRoutes);

module.exports = app;
