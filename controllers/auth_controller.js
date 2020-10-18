const UserModel = require("../models/user");
const passport = require('passport');

function registerNew(req, res) {
    res.render("auth/register");
}

function registerCreate(req, res, next) {
    const newUserHandler = (user) => {
    // Where did we get req.login from?
        req.login(user, (err) => {
        if(err){
            next(err)
        } else {
            res.redirect("/dashboard")
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
    res.redirect("/");
}

function loginNew(req, res) {
    res.render("auth/login");
}

function loginCreate(req, res, next) {
    const loginFunc = passport.authenticate("local",
        {
        successRedirect: "/dashboard",
        failureRedirect: "/user/login"
        })
    loginFunc(req, res, next)
}

module.exports = {
    registerNew,
    registerCreate,
    logOut,
    loginNew,
    loginCreate
}
