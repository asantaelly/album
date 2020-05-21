const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ des: 'picha/' })

const user_controller = require('../controllers/userController')

// User registration form view
router.get('/', user_controller.registration_form)

// Store users to the database
router.post('/register', upload.none(), user_controller.user_registration)

// Get one user
router.get('/:userID', user_controller.get_user)

// Update user
router.put('/:userID', upload.none(), user_controller.edit_user)

module.exports = router
