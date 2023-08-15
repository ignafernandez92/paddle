// app.js

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const cors = require('cors'); 
const registerRoute = require('./routes/register');

const app = express();


// Set up session
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  }));

// Middleware para permitir el uso de JSON en las solicitudes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());


// Importar las rutas de los diferentes módulos
const tournamentRoutes = require('./routes/tournamentRoutes');
const matchRoutes = require('./routes/matchRoutes');
const playerRoutes = require('./routes/playerRoutes');
const courtRoutes = require('./routes/courtRoutes');
const RegisterRoutes = require('./routes/register');

// Middleware para usar las rutas de los diferentes módulos
app.use('/tournaments', tournamentRoutes);
app.use('/matches', matchRoutes);
app.use('/players', playerRoutes);
app.use('/courts', courtRoutes);
app.use('/register', RegisterRoutes);

module.exports = app;