const express = require('express');
const router = express.Router();
const {authRedirect} = require("../middleware/auth_middleware")
const passport = require("passport")



const {registerCreate, 
    registerNew, 
    logOut, 
    loginNew,
    // issueCookie
    
    } = require('../controllers/auth_controller')


//authRedirect is middleware and can be run before any route function
router.get('/register', authRedirect, registerNew);
router.post('/register', registerCreate);

router.get('/logout', logOut);

router.get("/login", authRedirect,loginNew )
// router.post("/login", loginCreate)


router.post('/login', passport.authenticate('local', {
    // successRedirect: '/tasks/dashboard',
    failureRedirect: '/user/login',
    failureFlash: true
    }), (req, res) => {
    console.log(req.body)
    if ( req.body.remember_me ) {
        req.session.cookie.originalMaxAge = 24 * 60 * 60 * 1000 // Expires in 1 day
    } else {
        req.session.cookie.expires = false
    }
    res.redirect('/tasks/dashboard')
})

// debugging request

// router.post('/login', function(req, res, next) {
//     console.log(req.url);
//     passport.authenticate('local', function(err, user, info) {
//         console.log("authenticate");
//         console.log(err);
//         console.log(user);
//         console.log(info);
//     })(req, res, next);
// });

module.exports = router