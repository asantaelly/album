const connection = require('../env');
var multer = require('multer');
var upload = multer({ des: '../public/picha/'});



/**
 *  Return all images
 */
exports.show_images = (req, res, next) => {
    
}

/**
 *  Return only one image
 */
exports.show_image = (req, res, next) => {
    
}


/**
 *  Store image
 */
exports.post_image = (req, res) => {

    if(!req.file){
        return res.json({
            Message: 'No file uploaded',
        });
    }

    let time = new Date();
    let picha = req.file;
    let photoDetails = {
        description: req.body.description,
        photo: 'public/picha/'+picha.originalname,
        user_id: 1,                                         // id of user logged in and uploaded the particular picha will go here
        created_at: time,
        updated_at: time,
    }

    let query_string = 'INSERT INTO photos SET ?';
    connection.query(query_string, [photoDetails], (err, rows, fields) => {
        if(err) {
            return console.log(err);
        }

        return res.json({
            Message: 'Photo uploaded successfully',
            Photo: photoDetails
        });

    });
    
}


/**
 *  Delete an image
 */
exports.delete_image = (req, res) => {

}




/**
 *  Editing an image
 */
exports.update_image = (req, res) => {
    
}
