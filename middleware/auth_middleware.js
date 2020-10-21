function authRedirect(req, res, next) {
    if (req.user) {
        return res.redirect("/tasks/dashboard");
    }
    return next();
}

function authorise(req, res, next) {
    if (req.user) {
        return next();
    }
    return res.redirect("/home");
}

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        res.redirect("/user/login");
    }
}


module.exports = {
    authRedirect,
    authorise,
    checkAuthentication
}
