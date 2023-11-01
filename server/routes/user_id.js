const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('ruta user_id accedida')
  const { user_id } = req.user;
  res.json({ user_id });
});

module.exports = router;
