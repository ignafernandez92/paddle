
// Import the mysql package and create the database connection
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'padel.cwnvlmknuyto.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'padel123456',
  database: '',
});
connection.connect();

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