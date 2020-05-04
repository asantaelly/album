const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res) {
	res.send({
		Greetings: 'Welcome to the Boring Site!',
	})
})

module.exports = router
