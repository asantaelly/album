const express = require('express')
const router = express.Router()
const multer = require('multer')

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/images/uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	},
})
const upload = multer({ storage: storage })

const images_controller = require('../controllers/imageController')

// Upload a photo
router.post(
	'/upload_photo',
	upload.single('photo'),
	images_controller.post_image
)

// Get all photos
router.get('/photos', images_controller.show_images)

// Get only one photo
router.get('/photos/:photoID', images_controller.show_image)

// Delete a photo
router.delete('/photos/:photoID', images_controller.delete_image)

// Update a photo
router.put('/photos/:photoID', upload.none(), images_controller.update_image)

module.exports = router
