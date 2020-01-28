const express = require('express');
const sql = require('mssql'); 
const passport = require('passport'); 

const authRouter = express.Router();

function router(nav){

    authRouter.route('/signUp')
    .post((req, res) => {
        (async function addUser(){
            const {userName, password} = req.body;
            const sqlReq = new sql.Request();
            sqlReq.input('userName', sql.VarChar, userName);
            sqlReq.input('password', sql.VarChar, password);
            const response =  await sqlReq.query('insert into Users (userName, Password) Values (@userName, @password)');
            req.login(req.body, () => {
                res.redirect('/auth/profile');
            });
        }());
    });

    authRouter.route('/signIn')
    .get((req, res) => {
        res.render('signIn', {
            nav,
            title: 'Sign In'
        });
    });

    authRouter.route('/signIn').post(passport.authenticate('local', {
        successRedirect: '/auth/profile',
        failureRedirect: '/',
    }));

    authRouter.route('/profile')
    .all((req, res, next)=>{
        if(req.user){
            next();
        } else {
            res.redirect('/');
        }
    })
    .get( (req, res) =>{
        res.json(req.user);
    });

    return authRouter;
};

module.exports = router;