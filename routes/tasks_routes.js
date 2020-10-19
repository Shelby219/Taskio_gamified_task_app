const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTask,
  makeTask,
  removeTask,
  changeTask
} = require('../controllers/tasks_controller');

// READ

router.get('/', getTasks);

// READ
router.get('/:id', getTask);

// CREATE
router.post('/create', makeTask);

// DELETE
router.delete('/:id', removeTask);

// UPDATE

router.put('/:id', changeTask);

module.exports = router;