const express = require('express');
const db = require('./db');
const app = require('./app');


const PORT = 8080;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});