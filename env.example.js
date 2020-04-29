/**
 *   MySQL Database Configuration Settings
 * 
 *   Fill the connection attributes with your database credentials
 *   "user", "password", "database"
 * 
 *   "Host" is set to "localhost" for local development 
 *   Do not forget to change it when in Production
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
