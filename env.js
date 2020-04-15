const mysql = require('mysql');


    const connection = mysql.createConnection({
        host        : 'localhost',
        user        : 'root',
        password    : '',
        database    : 'creative_stock'
    });

    connection.connect();
 
module.exports = connection;
