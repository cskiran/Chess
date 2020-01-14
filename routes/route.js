const router = require('express').Router();
const controllers = require('../controller/userController');

// registration
router.route('/register').post(controllers.register);

// login
router.route('/login').post(controllers.login);

module.exports = router;