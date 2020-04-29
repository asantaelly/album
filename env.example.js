/**
 *   Settings for the setting of MySQL database 
 * 
 *   Fill the connection attribute with your database credentials
 *   "user", "password", "database"
 * 
 *   "Host" is set to "localhost" for local development 
 *   You can set is to production host url
 */


const mysql = require('mysql');


    const connection = mysql.createConnection({
        host        : 'localhost',
        user        : 'root',
        password    : '**********',
        database    : 'creative_stock_DB'
    });

    connection.connect();
 
module.exports = connection;
