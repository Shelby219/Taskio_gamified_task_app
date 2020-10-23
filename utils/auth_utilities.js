const User = require('../models/user');

// delete Task
// returns a query
const deleteUser = function (id) {
    return User.findByIdAndRemove(id);
};

// update Task
// returns a query
const updateUser = function (req) {
    
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

    //console.log(actualRequest)
    return User.findByIdAndUpdate(req.session.passport.user, actualRequest, {
        new: true
    });
};



module.exports = {updateUser, deleteUser}