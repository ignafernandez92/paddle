const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const connection = require('../db'); 

router.post('/login', async (req, res) => {
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

      const passwordMatches = await bcrypt.compare(password, user.password);
      if (!passwordMatches) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }


      const token = jwt.sign({ userId: user.user_id, role: user.role }, 'your_secret_key', {
        expiresIn: '1h', 
      });

      res.json({ message: 'Login successful', token });
    });
  } catch (error) {
    console.error('Error while processing request:', error);
    res.status(500).json({ message: 'Error processing request', error });
  }
});

module.exports = router;