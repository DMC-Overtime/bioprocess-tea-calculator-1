const express = require('express');
const authRouter =express.Router();
const passport = require('passport');

//const User = require('../models/user');

//auth login
authRouter.get('/login', (req,res) =>{
    res.render('login', {user: req.user});
});

//auth logout
authRouter.get('/logout', (req,res) =>{
    req.logout();
    res.redirect('/main');
});

//auth with google
authRouter.get('/google', passport.authenticate('google',{
    scope: ['profile','email']})
);

// callback route for google to redirect to
authRouter.get('/google/redirect', passport.authenticate('google'), (req,res) =>{
    //res.send(req.user);
    res.redirect('/profile/');
});


module.exports =authRouter;