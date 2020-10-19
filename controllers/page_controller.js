function index(req, res) {
    res.render("home")
}
    
function dashboard(req, res) {
    // const email = req.user.email;
    res.render("dashboard.pug");
}
    
module.exports = {
    index,
    dashboard
}
