const express = require('express');
const morgan = require('morgan');
//Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
const mongoose = require('mongoose');
const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const blogRoutes = require('./routes/blogRoutes');
const calculatorRoutes = require('./routes/calculatorRoutes');
const tutorialRoutes = require('./routes/tutorialRoutes');
const definitionRoutes = require('./routes/definitionRoutes');
const cookieSession = require('cookie-session');
const passport = require('passport');
const fileSystem = require('fs');
const fastCSV = require('fast-csv');

//register view engine
const app = express();

//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction
//You can add a middleware function to the processing chain for all responses with app.use(), 
//or for a specific HTTP verb using the associated method: app.get(), app.post(), etc. Routes 
//are specified in the same way for both cases, though the route is optional when calling app.use().


//Set view engine
app.set('view engine', 'ejs');

//Enable & encrypt cookies
app.use(cookieSession({
    maxAge: 24*60**60*1000,
    keys:[keys.session.cookieKey]
}));

//Enable & encrypt cookies
app.locals.input ="82";
app.locals.input ="82";

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB & Listen to Port
//PW original:
//mongoose.connect(keys.mongodb.dbURI,{useNewUrlParser: true, useUnifiedTopology: true}).then((result) => app.listen(process.env.PORT || 8000)).catch((err) => console.log(err));
//Revised:
app.listen(process.env.PORT || 8080);

//Middleware static files
//app.use(express.static('public'));

if ('public'.slice(-6) === '/build') { // For production
  app.use(express.static('public'))
} else { // For development
  app.use(express.static('public'))
}

app.use(express.urlencoded({ extended: true}));

//Morgan logging Middleware
app.use(morgan('dev'));

//auth Routes
app.use('/auth',authRoutes);

//Profile Routes
app.use('/profile',profileRoutes);

//Blog Routes
app.use('/blog',blogRoutes);

//Calculator Routes
app.use('/calculator',calculatorRoutes);

//User (Logged In Tutorial Routes)
app.use('/tutorials_user',tutorialRoutes);

//User (Logged In Definitions Routes)
app.use('/definitions_user',definitionRoutes);

//Main Routes
app.get('/', (req,res) =>{
   res.render('main', {user: req.user, title: 'Main'});
});

app.get('/main',(req,res) =>{
   res.render('main', {user: req.user, title: 'Main'});
});

//Main Tutorial Routes
app.get('/tutorials_main',(req,res) =>{
      res.render('tutorials_main', {title: 'Tutorials'});
});

//Main Definitions Routes
app.get('/definitions_main',(req,res) =>{
      res.render('definitions_main', {title: 'Definitions'});
});


//Catch all
app.use((req,res) =>{
         res.render('404', {user: req.user, title: '404'});
});

