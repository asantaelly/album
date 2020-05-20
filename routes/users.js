const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ des: 'picha/' })
const { check } = require('express-validator')

const user_controller = require('../controllers/userController')

// User registration form view
router.get('/', [
    check('name').isLength({min: 1}),
    check('email').isEmail(),
    check('password').isLength({min: 8})
], user_controller.registration_form)

// Store users to the database
router.post('/register', upload.none(), user_controller.user_registration)

// Get one user
router.get('/:userID', user_controller.get_user)

// Update user
router.put('/:userID', upload.none(), user_controller.edit_user)

module.exports = router
