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
        let allTasks = tasks
        res.render('alltasks', { 
            title: 'All Tasks', 
            tasks: tasks, 
            })
   
        // res.render("tasks/alltasks", {tasks: tasks });
        // console.log(tasks[2].name)
    });
};

const getTask = function (req, res) {
    // execute the query from getTaskById
    getTaskById(req).exec((err, task) => {
        if (err) {
            res.status(404);
            return res.send("Task not found");
        }
        res.render('tasks/task');
    });
};     

function taskNew(req, res) {
    res.render("tasks/new");
}

const makeTask = function (req, res) {
    // save the Task instance from addTask
    addTask(req)
    .then(t => 
        res.redirect("/tasks")
        )
    .catch(err => 
        res.send(err))
};

const removeTask = function (req, res) {
    deleteTask(req.params.id).exec((err) => {
        if (err) {
            res.status(500);
            return res.json({
                error: err.message
            });
        }
        res.sendStatus(204);
        res.send('Success');
    });
};

function taskEdit(req, res) {
    res.render("tasks/edit");
}

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
    changeTask,
    taskNew,
    taskEdit
};