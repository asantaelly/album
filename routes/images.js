var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ des: 'public/picha/'});


var images_controller = require('../controllers/imageController');

// Upload a photo
router.post('/upload_photo', upload.single('photo'), images_controller.post_image);

// Get all photos
router.get('/photos', images_controller.show_images);

// Get only one photo
router.get('/photos/:photoID', images_controller.show_image);

// Delete a photo
router.delete('/photos/:photoID', images_controller.delete_image);


module.exports = router;
