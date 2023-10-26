const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const connection = require('../db');

// const secretKey = process.env.SECRET_KEY_USER;

router.post('/', async (req, res) => {
  try {
    console.log('Login route handler accessed');

    const { email, password } = req.body;

    console.log('Received login request for email:', email);
    console.log('Received login request with password:', password);

    const query = 'SELECT * FROM users WHERE email = ?';

    connection.query(query, [email], async (error, results) => {
      if (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ message: 'Error fetching user', error });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: 'length dont match' });
      }

      const user = results[0];
      const hashedPasswordFromDB = user.password;

      const passwordMatches = await bcrypt.compare(password, hashedPasswordFromDB); 
      console.log('password:', password);
      console.log('hashedPasswordFromDB:', hashedPasswordFromDB);
      console.log('passwordMatches:', passwordMatches);
      if (!passwordMatches) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign({ user_id: user.user_id, role: user.role }, 'padel14789632', {
        expiresIn: '1h',
      });

      if (!token) {
        console.error('Error generating token');
        return res.status(500).json({ message: 'Error generating token' });
      }

      res.json({ message: 'Login successful', token, user_id: user.user_id, role: user.role });
    });
  } catch (error) {
    console.error('Error while processing request:', error);
    res.status(500).json({ message: 'Error processing request', error });
  }
});

module.exports = router;
