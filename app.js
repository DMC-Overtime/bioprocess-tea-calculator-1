const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const blogRoutes = require('./routes/blogRoutes');
const calculatorRoutes = require('./routes/calculatorRoutes');
const tutorialRoutes = require('./routes/tutorialRoutes');
const cookieSession = require('cookie-session');
const passport = require('passport');

//register view engine
const app = express();

//Set view engine
app.set('view engine', 'ejs');

//Enable & encrypt cookies
app.use(cookieSession({
    maxAge: 24*60**60*1000,
    keys:[keys.session.cookieKey]
}));

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB & Listen to Port
mongoose.connect(keys.mongodb.dbURI,{useNewUrlParser: true, useUnifiedTopology: true}).then((result) => app.listen(PORT || 8000)).catch((err) => console.log(err));

//Middleware static files
app.use(express.static('public'));
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

//Catch all
app.use((req,res) =>{
         res.render('404', {user: req.user, title: '404'});
});

