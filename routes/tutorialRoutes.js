const express = require('express');
const tutorialRouter =express.Router();
const passport = require('passport');

// const authCheck = (req,res,next) => {
//     if(!req.user){
//         //executes if the user is not logged in
//         res.redirect('/auth/login');
//     }else {
//         //if logged in
//         next();
//     }
// };

//PW Short-circuit the login:
const authCheck = (req,res,next) => {next();}

tutorialRouter.get('/', authCheck,(req,res) =>{
      res.render('tutorials_user', {user: req.user, title: 'Tutorials'});
});


module.exports =tutorialRouter;