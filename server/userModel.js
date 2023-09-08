const mysql = require('mysql2');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const createUser = async (user) => {
    try {
      const currentTimestamp = new Date().toISOString();
  
      const query = `INSERT INTO users (f_name, l_name, email, password, dni, date_of_birth, created_at, updated_at, role)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const values = [user.f_name, user.l_name, user.email, user.password, user.dni, user.date_of_birth, currentTimestamp, currentTimestamp, user.role];
  
      const [result] = await pool.promise().query(query, values);
  
      return { id: result.insertId, ...user };
    } catch (error) {
      throw error;
    }
  };
  
  module.exports = { createUser };