const UserModel = require("../models/user");
const passport = require('passport');
const {updateUser, deleteUser} = require("../utils/auth_utilities")

function registerNew(req, res) {
    res.render("auth/register.pug");
}
      
function registerCreate(req, res, next) {
    const newUserHandler = (user) => {
    // Where did we get req.login from?
        req.login(user, (err) => {
        if(err){
            next(err)
        } else {
            res.redirect("/tasks/dashboard")
        }
        })
    }
    const { email, password } = req.body;

    UserModel.create({email, password})
        .then(newUserHandler)
        .catch(x => console.log(x))
}

function logOut(req, res) {

    req.logout();
    res.redirect("/home");
}

function loginNew(req, res) {
    res.render("auth/login.pug");
}

// function loginCreate(req, res, next) {
//     const loginFunc = passport.authenticate("local",
//     {
//     successRedirect: "/tasks/dashboard",
//     failureRedirect: "/user/login"
//     })
//     loginFunc(req, res, next)
    
// }

function editUser(req, res) {
    user = req.session.user
    res.render("auth/edit.pug", { 
        user: user
        });
}

function editUserReq(req, res) {
    updateUser(req).exec((err, user) => {
        if (err) {
            res.status(500);
            return res.json({
                error: err.message
            });
        }
        res.status(200);
        res.redirect('/tasks/dashboard');
    })

}

async function removeUser(req, res) {
    console.log("hit via route in controller")
    console.log(req.session.passport.user)
    try{deleteUser(req.session.passport.user).exec(async (err) => {
        if (err) {
            res.status(500);
            return res.json({
                error: err.message
            });
        }
        else {res.redirect("/home")}
    })}
    
    catch(err) {console.log(err)}

}

module.exports = {
    registerNew,
    registerCreate,
    logOut,
    loginNew,
    editUser,
    editUserReq,
    removeUser
    // loginCreate
}
