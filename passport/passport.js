const passport = require('passport');
const User = require('./../models/User');
const config = require('config');

passport.use(User.createStrategy());

//serialize user data for sessions
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//This is webtoken strategy
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer');
opts.secretOrKey = config.get('jwt.secret');

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({
      _id: jwt_payload.uid
    }, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            console.log(user);
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

module.exports = passport;