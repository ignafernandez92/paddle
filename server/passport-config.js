const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./userModel'); 
const dotenv = require('dotenv');
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY_USER
};

passport.use(
  new JwtStrategy(jwtOptions, (payload, done) => {
    // Find the user based on the token payload
    User.findById(payload.sub, (err, user) => {
      if (err) {
        return done(err, false);
      }

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

// Middleware function to protect routes
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = requireAuth;
