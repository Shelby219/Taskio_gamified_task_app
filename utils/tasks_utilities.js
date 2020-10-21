const Task = require('../models/task');
const User = require('../models/user');

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
    let body = {}
    
    Object.assign(body, JSON.parse(JSON.stringify(req.body)));
    // delete req.body
    actualRequest= {}

    for (const [key, value] of Object.entries(body)) {
    
        if (value) {
            console.log(key)
            actualRequest[key] = value
        }
    }

    
    return Task.findByIdAndUpdate(req.params.id, actualRequest, {
        new: true
    });
};

// update completed   
// returns a query
const updateCompleted = function (req) {
    let completed = req.body.completed 
    if ( completed == 'yes') {
       // console.log(setpoints (req))
        return Task.findByIdAndUpdate(req.params.id, {$set: {completed: true }}, {
            new: true
        }) 
    
    } else {
        req.error = "No"
    }
};

//set points and update based on completed being ticked off
async function setpoints (req) {
    //iterate over tasks
    let user =  await User.findById(req.user._id);
    let userPoints = user.points
    return User.findByIdAndUpdate(req.user._id, {$set: {points:  userPoints + 1 }}, {
        new: true
    }) ;
}

//completed tally for nav
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
//all tasks tally for nav
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