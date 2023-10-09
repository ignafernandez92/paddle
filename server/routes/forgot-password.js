const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const connection = require('../db');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

const resetTokens = new Map();

function generateResetToken() {
  return crypto.randomBytes(20).toString('hex');
}

router.post('/forgot-password', (req, res) => {
  const { email } = req.body;

  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const token = generateResetToken();


  const tokenExpiry = Date.now() + 3600000; 
  resetTokens.set(token, { userId: user.id, expires: tokenExpiry });


  const resetLink = `http://localhost:8080/reset-password?token=${token}`;

  const msg = {
    to: email,
    from: 'ignafernandez92@gmail.com',
    subject: 'Password Reset',
    text: `Click the following link to reset your password: ${resetLink}`,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log('Password reset email sent');
      res.json({ message: 'Password reset email sent' });
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email' });
    });
});

router.post('/reset-password', (req, res) => {
  const { token, newPassword } = req.body;

  const tokenData = resetTokens.get(token);

  if (!tokenData || Date.now() > tokenData.expires) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }

  const userId = tokenData.userId;

  const user = findUserById(userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.password = newPassword;

  saveUser(user);

  function findUserById(userId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE user_id = ?';
      
      connection.query(query, [userId], (error, results) => {
        if (error) {
          reject(error);
        } else if (results.length === 0) {
          resolve(null); 
        } else {
          resolve(results[0]);
        }
      });
    });
  }

  function saveUser(user) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE users SET password = ? WHERE user_id = ?';
  
      connection.query(query, [user.password, user.user_id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
  

  resetTokens.delete(token);

  res.json({ message: 'Password reset successful' });
});


module.exports = router;