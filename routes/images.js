var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ des: 'public/picha/'});


var images_controller = require('../controllers/imageController');

router.post('/upload_photo', upload.single('photo'), images_controller.post_image);


module.exports = router;
