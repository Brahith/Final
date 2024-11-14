const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController'); // Make sure the path is correct

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

module.exports = router;
