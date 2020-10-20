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
const {checkAuthentication} = require("../middleware/auth_middleware")


// CREATE
router.get('/create', taskNew);
router.post('/create', makeTask);

// UPDATE
router.get('/edit/:id', taskEdit);
router.put('/edit/:id', changeTask);

// READ
router.get('/dashboard', checkAuthentication, getTasks);       

// READ
router.get('/:id', getTask);

// DELETE
router.delete('/:id', removeTask);



module.exports = router;