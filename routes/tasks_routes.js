const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTask,
  makeTask,
  removeTask,
  changeTask,
  taskNew,
  taskEdit
} = require('../controllers/tasks_controller');



// CREATE
router.get('/create', taskNew);
router.post('/create', makeTask);

// UPDATE
router.get('/edit', taskEdit);
router.put('/:id', changeTask);

// READ
router.get('/', getTasks);       

// READ
router.get('/:id', getTask);

// DELETE
router.delete('/:id', removeTask);



module.exports = router;