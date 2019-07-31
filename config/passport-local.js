const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
let User = require("./../model/user/user.schema");
passport.use(new LocalStrategy(
    {
        usernameField: "email"
      },
    function(email, password, done) {
      User.findOne({ email: email }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        if (!user.validatePassword(password)) {
         
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user,{message: "authenticated"});
      });
    }
  ));

  module.exports = passport;