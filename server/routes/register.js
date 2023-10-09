const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const userModel = require('../userModel');

console.log('Registration route accessed');

router.get('/', (req, res) => {
  console.log('GET request received at /register');
  res.json({ message: 'Registration route is accessible' });
});

router.post('/', async (req, res) => {
  console.log('POST request received at /register');
  try {
    const { f_name, l_name, email, password, dni, date_of_birth, role, username } = req.body;

    // Validation checks
    if (!f_name || !l_name || !email || !password || !dni || !date_of_birth || !role || !username) {
      console.log('Validation failed: Missing required fields');
      return res.status(422).json({ message: 'Missing required fields' });
    }

    // More detailed validation (e.g., email format, date_of_birth format) can be added here

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await userModel.createUser({
      f_name,
      l_name,
      username,
      email,
      password: hashedPassword,
      dni,
      date_of_birth,
      role,
    });

    console.log('User created successfully:', newUser);
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error while creating user:', error);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

module.exports = router;
