const connection = require('../env');
const magick = require('imagemagick');
const jwt = require('jsonwebtoken');

exports.show_images = (req, res, next) => {

    const queryString = 'SELECT * FROM images';
    connection.query(queryString, (err, rows, fields) => {
      if (err) throw err

      res.render('index', {data: rows});
    }); 
}

exports.show_image = (req, res, next) => {

    const imageId = req.params.id;
    const queryString = 'SELECT * FROM images WHERE id = ?'
    connection.query(queryString, [imageId], (err, rows, fields) => {
      if(err) throw err
      res.send(rows)
    });
}

exports.post_image = (req, res) => {

    jwt.verify(req.token, 'secretKey', (err, auth_data) => {
        if(err){
            throw err
        } else {

            if(!req.files)
                return res.status(400).send({
                    message: 'No file were uploaded'
                });

            let image = req.files.photo;
            let path = 'public/images/'+image.name
            let path_medium = 'public/images_480/'+image.name
            let path_small = 'public/images_340/'+image.name
            let time = new Date;
            let imageProperty = {
                name: null, description: req.body.description,
                size: null, width: null, height: null, grapher_id: auth_data.id,
                created_at: time
            }

            image.mv(path, (err) => {
                if(err) throw err

                magick.identify(path, (err, features) => {
                    if (err) throw err

                    // Resize to 715x480
                    image.mv(path_medium, (err) => {
                        if (err) throw err;
                        
                        magick.resize({
                            srcPath: path,
                            dstPath: path_medium,
                            width: 715,
                            height: 480
                        }, (err, stdout, stderr) => {
                            if (err) throw err;
                        })
                    })

                    // Resize to 507x340
                    image.mv(path_small, (err) => {
                        if (err) throw err;
                        
                        magick.resize({
                            srcPath: path,
                            dstPath: path_small,
                            width: 507,
                            height: 340
                        }, (err, stdout, stderr) => {
                            if (err) throw err;
                        })
                    })


                    imageProperty.name = path;
                    imageProperty.width = features.width;
                    imageProperty.height = features.height;
                    imageProperty.image_480 = path_medium;
                    imageProperty.image_340 = path_small;
                    imageProperty.size = features.filesize;

                    let sql = 'INSERT INTO images SET ?';
                    connection.query(sql, [imageProperty], (err, rows, fields) => {
                        if (err) throw err
                        res.send({
                            message: 'image was successful uploaded',
                            imageProperty,
                            auth_data
                        });
                    });

                });

            });

        } // end else
    });
}

exports.delete_image = (req, res) => {

    jwt.verify(req.token, 'secretKey', (err, auth_data) => {
        if(err) {
            res.sendStatus(403);
            res.json({
                err
            });
        }

        let image_id = req.params.id;
        let sql = 'DELETE FROM images WHERE id = ?';
        connection.query(sql, [image_id], (err, rows, fields) => {
            res.json({
                message: 'Image was deleted successfull',
            });
        });
    });
}

exports.update_image = (req, res) => {

    jwt.verify(req.token, 'secretKey', (err, auth_data) => {
        if (err) throw err
        
        let id = req.params.id;
        let description = req.body.description;
        let sql = 'UPDATE images SET description = ? WHERE id = ?';
        connection.query(sql, [description, id], (err, rows, fields) =>{
            if(err) throw err
            res.json({
                message: 'image updated'
            });
        });
    });
}
