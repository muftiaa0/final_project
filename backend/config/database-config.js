// Database info
const mysql = require('mysql');
const host = process.env.DB_HOST || 'localhost';
const user = process.env.DB_USER || 'root';
const password = process.env.DB_PW || 'password';
const database = process.env.DB_NAME || 'hr_primary';

// Database connection string
const con = mysql.createConnection({
    host, user, password, database
});

// Make connection to DB
con.connect(function(err) {
    if (err) throw err;
    console.log('Successfully Connected to Database');

    // create employee table
        // employee ID, username, password (will be defaulted and then on first login prompted to change), first_name, last_name, home address

    // create salary table
        // design salary table

    // create org chart
        // design org chart (one to many relationship)

 
});

module.exports = con;