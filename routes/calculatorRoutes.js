const express = require('express');
const calculatorRouter =express.Router();
const passport = require('passport');
const Tea = require('../models/teas');

const authCheck = (req,res,next) => {
    if(!req.user){
        //executes if the user is not logged in
        res.redirect('/auth/login');
    }else {
        //if logged in
        next();
    }
};

calculatorRouter.get('/', authCheck, (req,res) =>{
    res.render('calculator',{user: req.user, title: 'Calculator'});
});

calculatorRouter.post('/', authCheck,(req,res) =>{
 const tea = new Tea(req.body);
 tea.save().then((result) => {res.redirect('/tea_log');}).catch((err) => {console.log(err);});
})

calculatorRouter.get('/tea_log', authCheck,(req,res) =>{
      res.render('tea_log', {user: req.user,title: 'TEA History'});
});

calculatorRouter.get('/', authCheck,(req,res) =>{
    Tea.find().sort({createdAt:-1}).then((result) => {res.render('tea_log', {title: "TEA History", teas: result})}).catch((err) => {console.log(err);});
})


calculatorRouter.get('/:id', authCheck, (req,res) =>{
     const id = req.params.id;
     Tea.findById(id)
        .then((result) =>{
         res.render('tea_details', {user: req.user,tea:result});
    })
    .catch((err) =>{
        console.log(err);
    })
});


calculatorRouter.post('/tea_log', authCheck, (req,res) =>{
    const tea = new Tea(req.body);
    tea.save()
        .then((result) => {
        res.redirect('/calculator/tea_log')
         })
        .catch((err) => {
            console.log(err);
        })
});


calculatorRouter.delete('/tea_log/:id', authCheck, (req,res) =>{
    const id = req.params.id;
    Tea.findByIdAndDelete(id)
        .then(result => {
            res.json({redirect: '/caclulator/tea_log'})
        })
        .catch(err =>{
        console.log(err);
        })
});



module.exports =calculatorRouter;