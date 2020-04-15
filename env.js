const mysql = require('mysql');


    const connection = mysql.createConnection({
        host        : 'localhost',
        user        : 'root',
        password    : 'iamroot',
        database    : 'gallery'
    });

    connection.connect();
 
module.exports = connection;
