const express = require('express');
const {authorise} = require("../middleware/auth_middleware")
const router = express.Router();
const {
    index,
    dashboard
} = require('../controllers/page_controller');
const {checkAuthentication, authRedirect} = require("../middleware/auth_middleware")

router.get('/home', authRedirect, index);
router.get('/dashboard', checkAuthentication, dashboard);

module.exports = router;