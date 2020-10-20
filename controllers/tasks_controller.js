const task = require('../models/task');
const {
    getAllTasks,
    getTaskById,
    addTask,
    deleteTask,
    updateTask,
    updateCompleted,
    setpoints,
    comTallyT,
    taskTallyT
} = require('../utils/tasks_utilities');

const getTasks = function (req, res) {
    // execute the query from getAllTask
    
    getAllTasks(req)
    .sort({
        due_date: 1
    })
    .exec((err, tasks) => {
        if (err) {
            res.status(500);
            return res.json({
                error: err.message
            });
        }

        let points = (setpoints(tasks))
        let allTally = (taskTallyT(tasks))
        let comTally = (comTallyT(tasks))
      
        res.render('dashboard.pug', { 
            title: 'Your Tasks', 
            tasks: tasks,
            user: req.user,
            points: points,
            all: allTally,
            com: comTally

            })
    })
};


const getTask = function (req, res) {
    // execute the query from getTaskById
    getTaskById(req).exec((err, task) => {
        if (err) {
            res.status(404);
            return res.send("Task not found");
        }
        res.render('tasks/task.pug', { 
            title: task.name, 
            task: task,
            user: req.user
            })
    });
};     

function taskNew(req, res) {
    res.render("tasks/new_task.pug", { 
        user: req.user
        });
}

const makeTask = function (req, res) {
    // save the Task instance from addTask
    addTask(req)
    .then(t => 
        res.redirect("/tasks/dashboard")
        )
    .catch(err => 
        res.send(err))
};

const removeTask = async function (req, res) {
    deleteTask(req.params.id).exec(async (err) => {
        if (err) {
            res.status(500);
            return res.json({
                error: err.message
            });
        }
        //res.sendStatus(204);
        await res.redirect("/tasks/dashboard")
    });
};

function taskEdit(req, res) {
    let id = req.params.id
    res.render("tasks/edit_task.pug", { 
        id: id,
        user: req.user
        });
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
        res.redirect('/tasks/dashboard');
    });
};

const changeCompleted = function (req, res) {
    // execute the query from updateCompleted
    updateCompleted(req).exec((err, task) => {
        if (err) {
            res.status(500);
            return res.json({
                error: err.message
            });
        }
        
        res.status(200);
        res.redirect('/tasks/dashboard');
    });
};



module.exports = {
    getTasks,
    getTask,
    makeTask,
    removeTask,
    changeTask,
    taskNew,
    taskEdit,
    changeCompleted
};