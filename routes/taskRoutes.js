const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController'); // Ensure this path is correct
const passport = require('passport');
const DB = require('../config/db');
let userModel = require('../model/User');
let User = userModel.User;

// Route to render all tasks
router.get('/', taskController.getAllTasks);

// Route to render form to create a new task
router.get('/create', taskController.renderCreateForm);

// Route to handle new task submission
router.post('/create', taskController.createTask);

// Route to render edit form for a task
router.get('/edit/:id', taskController.renderEditForm);

// Route to handle edit submission
router.post('/edit/:id', taskController.updateTask);

// Route to handle task deletion
router.post('/delete/:id', taskController.deleteTask);

// Route to render login page
router.get('/login', function (req, res, next) {
    if (!req.user) {
        res.render('auth/login', {
            title: 'Login',
            message: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    } else {
        return res.redirect('/');
    }
});

// Route to handle login form submission
router.post('/login', function (req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect('/Task');
        });
    })(req, res, next);
});

// Route to render register page
router.get('/register', function (req, res, next) {
    if (!req.user) {
        res.render('auth/register', {
            title: 'Register',
            message: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    } else {
        return res.redirect('/');
    }
});

// Route to handle user registration
router.post('/register', function (req, res, next) {
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) => {
        if (err) {
            console.log("Error: Inserting the new User");
            if (err.name === "UserExistsError") {
                req.flash('registerMessage', 'Registration Error: User already exists');
            }
            return res.render('auth/register', {
                title: 'Register',
                message: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        } else {
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/Task');
            });
        }
    });
});

// Route to handle logout
router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

module.exports = router;
