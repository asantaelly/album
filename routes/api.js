let express = require('express');
let router = express.Router();
let image_Controller = require('../controllers/imageController');

router.get('/', image_Controller.show_images);

module.exports = router;
