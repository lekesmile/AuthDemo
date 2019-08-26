const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('./models')

passport.serializeUser((user, done) => {
    done(null, user._id)
});

passport.deserializeUser(function (id, done) {
    db.User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
    function (req, email, password, done) {
        db.User.findOne({ 'email': email }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { console.log(user); return done(null, false); }
            if (!user.comparePassword(password)) { return done(null, false); }
            return done(null, user);
        });
    }
));