var express = require('express');
var router = express.Router();


var user_controller = require('../controllers/userController');

// User registration form view
router.get('/', user_controller.registration_form);

// Store users to the database
router.post('/register', user_controller.user_registration);

// Get one user
router.get('/:userID', user_controller.get_user);


module.exports = router;
