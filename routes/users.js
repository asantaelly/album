var express = require('express');
var router = express.Router();


var user_controller = require('../controllers/userController');

/**
 *  Routes to get registration form
 */
router.get('/', user_controller.registration_form);

module.exports = router;
