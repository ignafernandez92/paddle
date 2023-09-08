const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const connection = require('../db'); 

const secretKey = process.env.SECRET_KEY_USER;

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ?';
    connection.query(query, [email], async (error, results) => {
      if (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ message: 'Error fetching user', error });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const user = results[0];
      console.log(user.email,user.password);

      console.log('Received Plain-Text Password:', password);
      console.log('Hashed Password from DB:', user.password);

      const passwordMatches = await bcrypt.compare(password, user.password);
      if (!passwordMatches) {
        return res.status(401).json({ message: 'ACA ESTA EL PROBLEMA' });
      }

      const token = jwt.sign({ userId: user.user_id, role: user.role }, secretKey, {
        expiresIn: '1h', 
      });

      if (!token) {
        console.error('Error generating token');
        return res.status(500).json({ message: 'Error generating token' });
      }

      res.json({ message: 'Login successful', token });
    });
  } catch (error) {
    console.error('Error while processing request:', error);
    res.status(500).json({ message: 'Error processing request', error });
  }
});

module.exports = router;