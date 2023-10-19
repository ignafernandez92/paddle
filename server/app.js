
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const cors = require('cors'); 
const app = express();

const secretKey = process.env.SECRET_KEY_USER;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: 'padel14789632',
  resave: false,
  saveUninitialized: false,
}));

app.use(morgan('combined')); 
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, 
}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.options('*', cors());
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

const tournamentRoutes = require('./routes/tournamentRoutes');
const matchRoutes = require('./routes/matchRoutes');
const playerRoutes = require('./routes/playerRoutes');
const courtRoutes = require('./routes/courtRoutes');
const RegisterRoutes = require('./routes/register');
const login = require('./routes/login');
const forgotPasswordRoutes = require('./routes/forgot-password');
const user_id = require('./routes/user_id');

app.use('/login', login);
app.use('/tournaments', tournamentRoutes);
app.use('/matches', matchRoutes);
app.use('/players', playerRoutes);
app.use('/courts', courtRoutes);
app.use('/register', RegisterRoutes);
app.use('/password-reset', forgotPasswordRoutes);
app.use('/api/get-user-id', user_id);

module.exports = app;