const passport = require('passport'); //  authorization\ authentication
const { Strategy } = require('passport-local'); 
const sql = require('mssql'); 

module.exports = function localStrategy() {
    passport.use(new Strategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        }, 
        async (username, password, done) => {
            try{
                console.log(username);
                const sqlReq = new sql.Request();
                sqlReq.input('userName', sql.VarChar, username);
                const { recordset } = await sqlReq.query('select * from Users where UserName = @userName');
                console.log(recordset);
                if(user.password === recordset[0].Password){
                    console.log('User has been Found');
                    return done(null, user);
                } else{
                    console.log('User hasnt been Found');
                    return done(null, false);
                }
            }
            catch(e){
                console.log(e);
                return done(null, false);
            }
        }
    ));
    return passport;
}