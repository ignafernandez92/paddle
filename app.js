// app.js

const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para permitir el uso de JSON en las solicitudes
app.use(express.json());

// Agregar aquí las rutas

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});


// Importar las rutas de los diferentes módulos
const tournamentRoutes = require('./routes/tournamentRoutes');
const matchRoutes = require('./routes/matchRoutes');
const playerRoutes = require('./routes/playerRoutes');
const courtRoutes = require('./routes/courtRoutes');

// ...

// Middleware para usar las rutas de los diferentes módulos
app.use('/tournaments', tournamentRoutes);
app.use('/matches', matchRoutes);
app.use('/players', playerRoutes);
app.use('/courts', courtRoutes);
