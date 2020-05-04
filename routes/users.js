var express = require('express')
var router = express.Router()
var multer = require('multer')
var upload = multer({ des: 'picha/' })

var user_controller = require('../controllers/userController')

// User registration form view
router.get('/', user_controller.registration_form)

// Store users to the database
router.post('/register', upload.none(), user_controller.user_registration)

// Get one user
router.get('/:userID', user_controller.get_user)

// Update user
router.put('/:userID', upload.none(), user_controller.edit_user)

module.exports = router
