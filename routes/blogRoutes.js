const express = require('express');
const blogRouter =express.Router();
const passport = require('passport');
const Blog = require('../models/blog');

const authCheck = (req,res,next) => {
    if(!req.user){
        //executes if the user is not logged in
        res.redirect('/auth/login');
    }else {
        //if logged in
        next();
    }
};

blogRouter.get('/newblog', authCheck, (req,res) =>{
     res.render('newblog', {user: req.user});
});

blogRouter.get('/blogs', authCheck, (req,res) =>{
    Blog.find().sort({createdAt:-1})
    .then((results) =>{
     res.render('blogs', {user: req.user, blogs:results});
    })
    .catch((err) =>{
        console.log(err);
    })
});

blogRouter.get('/blogs/:id', authCheck, (req,res) =>{
     const id = req.params.id;
     Blog.findById(id)
        .then((result) =>{
         res.render('blog_details', {user: req.user,blog:result});
    })
    .catch((err) =>{
        console.log(err);
    })
});


blogRouter.post('/blogs', authCheck, (req,res) =>{
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
        res.redirect('/blog/blogs')
         })
        .catch((err) => {
            console.log(err);
        })
});


blogRouter.delete('/blogs/:id', authCheck, (req,res) =>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({redirect: '/blog/blogs'})
        })
        .catch(err =>{
        console.log(err);
        })
});

module.exports =blogRouter;