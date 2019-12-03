const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const mongoose = require('mongoose');

var User = mongoose.model('User');

// Google OAuth Strategy
passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: '793080839530-sdr0nj1r4vn2ukhff08combdn0joq27m.apps.googleusercontent.com',
    clientSecret: 'DyQSnOHJXEtv9L4lYx0SHyr1'

}, async(accessToken, refreshToken, profile, done) => {
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('profile', profile);

}));




// Local Strategy
passport.use(
    new localStrategy({ usernameField: 'email' },
        (username, password, done) => {
            User.findOne({ email: username },
                (err, user) => {
                    if (err)
                        return done(err);
                    // unknown user
                    else if (!user)
                        return done(null, false, { message: 'Email is not registered' });
                    // wrong password
                    else if (!user.verifyPassword(password))
                        return done(null, false, { message: 'Wrong password.' });
                    // authentication succeeded
                    else
                        return done(null, user);
                });
        })
);