
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
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
  preflightContinue: false,
  optionsSuccessStatus: 204,
}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
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

app.use('/register', RegisterRoutes);
app.use('/password-reset', forgotPasswordRoutes);
app.use('/api/get-user-id', user_id);

app.get('/protected', requireAuth, (req, res) => {
  res.json({ message: 'This is a protected route.' });
});

module.exports = app;