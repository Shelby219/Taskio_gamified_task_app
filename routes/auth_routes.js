const express = require('express');
const router = express.Router();
const {authRedirect} = require("../middleware/auth_middleware")


const {registerCreate, registerNew , logOut, loginNew, loginCreate} = require('../controllers/auth_controller')



//authRedirect is middleware and can be run before any route function
router.get('/register', authRedirect, registerNew);
router.post('/register', registerCreate);

router.get('/logout', logOut);

router.get("/login",authRedirect, loginNew )
router.post("/login", loginCreate )

module.exports = router