const express = require('express');
const router = express.Router();
const connection = require('../env');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({
    Greetings: 'Welcome to the Boring Site!'
  });
});




module.exports = router;

