const Task = require('../models/task');

// Exported functions

// get all Tasks
// return a query
const getAllTasks = function (req) {
    //return Task.find();
    //validation for finding tasks with author id
    return Task.find({author: {$in: [req.user.id]}})
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
        notes: req.body.notes,
        difficulty: req.body.difficulty,
        category: req.body.category,
        repeating: req.body.repeating,
		create_date: date,
        modified_date: date,
        due_date: req.body.due_date,
        author: req.user._id
	}
 
    const newTask = new Task(task);
    return newTask.save()
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

// update completed   
// returns a query
const updateCompleted = function (req) {
    let completed = req.body.completed 
    if ( completed == 'yes') {
        return Task.findByIdAndUpdate(req.params.id, {$set: {completed: true }}, {
            new: true
        }) ;
    } else {
        req.error = "No"
    }
};

//set points based on completed tasks
function setpoints (tasks) {
    //iterate over tasks
    let points = 0
    for(let t of tasks){
        if (t.completed == true){
            //console.log(t)
            points += 1
        }
      }
    return points;
}

function comTallyT (tasks) {
    //iterate over tasks
    let comTally = 0
    for(let t of tasks){
        if (t.completed == true){
            //console.log(t)
            comTally += 1
        } 
      }
    return comTally ;
}

function taskTallyT (tasks) {
    //iterate over tasks
    let allTally = 0
    for(let t of tasks){
        if (t){
            //console.log(t)
            allTally += 1
        } 
      }
    return allTally ;
}



//get timing out tasks
function timingOut() {
    const date = Date.now()
    const tom = new Date().getDate()+1;

    console.log(date - tom)
    // const hour = 1000 * 60 * 60;
    // const anHourAgo = date - hour;
    // date > anHourAgo;

    // let timing = 0
    // for(let t of tasks){
    //     if (t.due_date == true){
    //         console.log(t)
    //         timing += 1
    //     }
    //   }
    // return timing;

}
timingOut()

module.exports = {
    getAllTasks,
    getTaskById,
    addTask,
    deleteTask,
    updateTask,
    updateCompleted,
    setpoints,
    comTallyT,
    taskTallyT
}