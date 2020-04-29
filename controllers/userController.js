const connection = require('../env');
const jwt = require('jsonwebtoken');


/**
 *  User registration form
 */
exports.registration_form = (req, res, next) => {
    res.json({
        message: 'Registration form',
    })
}



/**
 *  Store new user to the database
 */
exports.user_registration = (req, res, next) => {
    let time = new Date();
    let userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        created_at: time
    }

    let query_string = 'INSERT INTO users SET ?';
    connection.query(query_string, [userData], (err, rows, fields) => {
        if (err) throw err
            res.json({
                message: 'user created successfully',
                user: userData
            });
    });
}


/**
 * 
 *   Return one user
 */
exports.get_user = (req, res, next) => {

    let user_id = req.params.userID;

    let fetch_query = 'SELECT * FROM users WHERE id = ?';
    connection.query(fetch_query, [user_id], (err, rows, fields) => {
        
        if(err) return console.log(err);

        return res.json({
            User: rows,
        });
    });
}


/**
 *   Authenticate a user 
 */
exports.user_login = (req, res, next) => {
    
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
}
