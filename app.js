// app.js

const express = require('express');
const app = express();
const morgan = require('morgan');

// Middleware para permitir el uso de JSON en las solicitudes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('public'));
// Agregar aquí las rutas



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


module.exports = app;