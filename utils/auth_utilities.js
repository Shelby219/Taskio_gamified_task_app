const User = require('../models/user');

// delete Task
// returns a query
const deleteUser = function (id) {
    return User.findByIdAndRemove(id);
};

// update Task
// returns a query
const updateUser = function (req) {
    
    
    // let body = req.body
    // Object.entries(body).forEach(function(pair) {
    //     // key: the name of the object key
    //     // index: the ordinal position of the key within the object
    //     console.log(pair)
    //     if (pair[1] == '') {
            
    //         delete req.body.pair[0]
    //     }
    // })
    
    console.log(req.body)
    return User.findByIdAndUpdate(req.session.passport.user, req.body, {
        new: true
    });
};


module.exports = {updateUser, deleteUser}