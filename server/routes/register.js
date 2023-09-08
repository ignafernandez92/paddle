const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const connection = require('../db'); // Import the connection object

router.post('/', async (req, res) => {
    try {
      const { f_name, l_name, email, password, dni, date_of_birth, role } = req.body;
  
      // Check if all required fields are present in the request body
      if (!f_name || !l_name || !email || !password || !dni || !date_of_birth || !role) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await userModel.createUser({
      f_name, l_name, email, password: hashedPassword, dni, date_of_birth, role
    });
  
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error('Error while creating user:', error);
      res.status(500).json({ message: 'Error creating user', error });
    }
  });
  
module.exports = router;
