const express = require('express');
const router = express.Router();
const {authRedirect} = require("../middleware/auth_middleware")
const passport = require("passport")


const {registerCreate, 
    registerNew, 
    logOut, 
    loginNew,
    // issueCookie
    loginCreate 
    } = require('../controllers/auth_controller')


//authRedirect is middleware and can be run before any route function
router.get('/register', authRedirect, registerNew);
router.post('/register', registerCreate);

router.get('/logout', logOut);

router.get("/login", authRedirect,loginNew )
router.post("/login", loginCreate)
// router.post("/login", 
//     passport.authenticate('local', {failureRedirect: '/login', failureFlash: true }), 
//     issueCookie)


module.exports = router