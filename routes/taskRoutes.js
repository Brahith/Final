const express = require('express');
const router = express.Router();

// In-memory array to store tasks
let tasks = [
  { name: 'Complete Project Proposal', endDate: 'Dec 09, 2024', status: 'Not Started', priority: 'High' },
  { name: 'Design UI Mockups', endDate: 'Nov 20, 2024', status: 'In Progress', priority: 'Medium' },
];

// GET request to fetch tasks
router.get('/', (req, res) => {
  res.render('index', { tasks });
});

module.exports = router;
