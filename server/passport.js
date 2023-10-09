const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require ('./db')

passport.use(new LocalStrategy((username, password, done) => {
  const query = 'SELECT * FROM users WHERE username = ?';
  connection.query(query, [username], (err, user) => {
    if (err) return done(err);
    if (!user || user.length === 0) return done(null, false, { message: 'Incorrect username' });
    bcrypt.compare(password, user[0].password, (err, passwordMatches) => {
      if (err) return done(err);
      if (!passwordMatches) return done(null, false, { message: 'Incorrect password' });
      return done(null, user[0]);
    });
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const query = 'SELECT * FROM users WHERE id = ?';
  connection.query(query, [id], (err, user) => {
    done(err, user);
  });
});

module.exports = passport;