const passport = require('passport'); //  authorization\ authentication
require('../config/strategeis/localStrategy.js')();
// serializeUser - stores user in session
// derializeUser - retrieves user from session

module.exports = function passportConfig(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser( (user, done) => {
        console.log('serializeUser');
        done(null, user);
    });

    passport.deserializeUser( (user, done) => {
        console.log('deserializeUser');
        done(null, user);
    })

    return app;
}
