
// Import the mysql package and create the database connection
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user:process.env.DB_USER ,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE ,
});

// Event listener for the 'connect' event
connection.on('connect', () => {
    console.log('Connected to the database!');
  });
  
  // Event listener for the 'error' event
  connection.on('error', (err) => {
    console.error('Error connecting to the database:', err.message);
  });
  
  // Connect to the database
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err.message);
    } else {
      console.log('Database connection successful!');
    }
  });

  module.exports = connection;