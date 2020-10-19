const Task = require('../models/task');

// Exported functions

// get all Tasks
// return a query
const getAllTasks = function (req) {
    return Task.find();
};

// get Task by id
// returns a query
const getTaskById = function (req) {
    let task =  Task.findById(req.params.id);
    if (task) return task
	else req.error = "Task not found"
};

// add Task
// returns a new Task object
const addTask = function (req) {
    const date = Date.now()
	let task = {
		name: req.body.name,
        description: req.body.description,
        author: req.user.id,
        category: "test",
        completed: false ,
        points: 0 ,
        repeating: false ,
		create_date: date,
		modified_date: date
	}
    return new Task(task);
}

// delete Task
// returns a query
const deleteTask = function (id) {
    return Task.findByIdAndRemove(id);
};

// update Task
// returns a query
const updateTask = function (req) {
    req.body.modified_date = Date.now();
    return Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
};

module.exports = {
    getAllTasks,
    getTaskById,
    addTask,
    deleteTask,
    updateTask
}