function index(req, res) {
    res.render("home.pug")
}
    
function dashboard(req, res) {

    res.render("dashboard.pug");
}
    
module.exports = {
    index,
    dashboard
}
