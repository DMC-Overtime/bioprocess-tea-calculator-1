const express = require('express');
const definitionRouter =express.Router();
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

definitionRouter.get('/', authCheck,(req,res) =>{
      res.render('definitions_user', {user: req.user, title: 'Definitions'});
});


module.exports =definitionRouter;