const Task = require('../model/Task'); // Ensure the path is correct

// Retrieve and render all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.render('index', { tasks });
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).send('Internal Server Error');
  }
};

// Render the form to create a new task
exports.renderCreateForm = (req, res) => {
  res.render('create');
};

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { name, end_date, status, priority } = req.body;
    const newTask = new Task({ name, end_date, status, priority });
    await newTask.save();
    res.redirect('/');
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).send('Internal Server Error');
  }
};

// Render the edit form for a task
exports.renderEditForm = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send('Task not found');
    }
    res.render('edit', { task });
  } catch (err) {
    console.error('Error fetching task for editing:', err);
    res.status(500).send('Internal Server Error');
  }
};

// Update an existing task
exports.updateTask = async (req, res) => {
  try {
    const { name, end_date, status, priority } = req.body;
    await Task.findByIdAndUpdate(req.params.id, { name, end_date, status, priority });
    res.redirect('/');
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).send('Internal Server Error');
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getAllTasks = async (req, res) => {
  const displayName = req.user ? req.user.displayName : null; // Pass displayName to views
  try {
    const tasks = await Task.find();
    res.render('index', { tasks, displayName });
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).send('Internal Server Error');
  }
};