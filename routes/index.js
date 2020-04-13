const express = require('express');
const router = express.Router();
const connection = require('../env');
const magick = require('imagemagick');
const jwt = require('jsonwebtoken');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({
    Greetings: 'Welcome to the Boring Site!'
  });
});


/** 
    
    IMAGE RESOURCE ROUTES
    
*/

// Show all image resources
router.get('/api/images', function(req, res, next) {

    const queryString = 'SELECT * FROM images';
    connection.query(queryString, (err, rows, fields) => {
      if (err) throw err
      res.send(rows);
    }); 
});

// Show one image resource
router.get('/api/images/:id', (req, res, next) => { 

    const imageId = req.params.id;
    const queryString = 'SELECT * FROM images WHERE id = ?'
    connection.query(queryString, [imageId], (bomu, rows, fields) => {
      if(bomu) throw bomu
      res.send(rows)
    })

});


router.post('/api/images', verifyToken, (req, res, next) => {

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
                    });

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
                    });


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

});


// route to delete a resource
router.delete('/api/images/:id', verifyToken, (req, res, next) => {

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
        
        
});


// Route to update image
router.put('/api/images/:id', verifyToken, (req, res) => {

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
        
});






/* USER RESOURCES ROUTES */

// registration handler
router.post('/api/users/registration', (req, res, next) => {
    
    let time = new Date();
    let userData = {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        created_at: time
    }

    let query_string = 'INSERT INTO graphers SET ?';
    connection.query(query_string, [userData], (err, rows, fields) => {
        if (err) throw err
            res.json({
                message: 'User Created Successfully'
            });
    });

});

// login handler
router.post('/api/users/login', (req, res, next) => {

  let token = null;
  let userData = {
    id: null,
    email: req.body.email,
    password: req.body.password
  }
    

    let query_string = 'SELECT * FROM graphers WHERE email = ? AND password = ?';
    connection.query(query_string, [userData.email, userData.password], (err, rows, fields) => {
        if (err) {
            throw err
        } else {
            if(rows.length > 0){
                let auth_data = {
                    id: rows[0].id,
                    first_name: rows[0].first_name,
                    last_name: rows[0].last_name,
                    email: rows[0].email,
                }

                token = jwt.sign(auth_data, 'secretKey',{ expiresIn: 60*60 });
                res.json({
                    token
                });
            } else {
                res.json({
                    message: 'Email or Password is not recognized!'
                })
            }
        }   //  end else     
    });

});

// TOKEN FORMAT
// Authorization: Bearer <accessToken>
function verifyToken(req, res, next){
    const bearerHeader = req.body.token || req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        req.token = bearer[1];
        next();
    } else {
        res.sendStatus(403);
    }
}



module.exports = router;

