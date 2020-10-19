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

function issueCookie(req, res, next) {
    console.log(req)
    // issue a remember me cookie if the option was checked
    if (!req.body.remember_me) { return next(); }

    var token = utils.generateToken(64);
    Token.save(token, { userId: req.user.id }, function(err) {
      if (err) { return done(err); }
      res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 }); // 7 days
      res.redirect('/');
    });
    next();
}

module.exports = {
    registerNew,
    registerCreate,
    logOut,
    loginNew,
    issueCookie
}
