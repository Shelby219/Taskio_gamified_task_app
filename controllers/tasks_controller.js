const {
    getAllTasks,
    getTaskById,
    addTask,
    deleteTask,
    updateTask
} = require('../utils/tasks_utilities');

const getTasks = function (req, res) {
    // execute the query from getAllTask
    getAllTasks(req)
    .exec((err, tasks) => {
        if (err) {
            res.status(500);
            return res.json({
                error: err.message
            });
        }
        //res.send(tasks)
        res.render("tasks/alltasks");
    });
};

const getTask = function (req, res) {
    // execute the query from getTaskById
    getTaskById(req).exec((err, task) => {
        if (err) {
            res.status(404);
            return res.flash("Task not found");
        }
        res.render('tasks/task');
    });
};

const makeTask = function (req, res) {
    // save the Task instance from addTask
    addTask(req).save((err, task) => {
        if (err) {
            res.status(500);
            return res.json({
                error: err.message
            });
        }
        res.status(201);
        //req.flash('success', 'Task Created')
        res.send('Success');
        res.redirect('/dashboard');
    });
};

const removeTask = function (req, res) {
    // execute the query from deleteTask
    deleteTask(req.params.id).exec((err) => {
        if (err) {
            res.status(500);
            return res.json({
                error: err.message
            });
        }
        res.sendStatus(204);
        //req.flash('success', 'Task Deleted')
        res.send('Success');
    });
};

const changeTask = function (req, res) {
    // execute the query from updateTask
    updateTask(req).exec((err, task) => {
        if (err) {
            res.status(500);
            return res.json({
                error: err.message
            });
        }
        res.status(200);
        //req.flash('success', 'Task Updated')
        res.send('Success');
        res.redirect('/dashboard');
    });
};

module.exports = {
    getTasks,
    getTask,
    makeTask,
    removeTask,
    changeTask
};