const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/users');

passport.serializeUser((user,done) =>{
    done(null,user.id);
});

passport.deserializeUser((id,done) =>{
    User.findById(id).then((user) =>{
        done(null,user);
    });
});

passport.use(
    new GoogleStrategy({
        //options for the google strategy
        callbackURL: '/auth/google/redirect',
        clientID:keys.google.clientID,
        clientSecret:keys.google.clientSecret
    },(accessToken,refreshToken,profile,email,done) => {
    // passport callback  function
     console.log(email);
    //check is user already exists
    User.findOne({googleId: profile.id}).then((currentUser) =>{
     if(currentUser){
        //already have user
        console.log('user is:', currentUser);
        done(null,currentUser);
     } else{
        new User({
            username: email.displayName,
            googleId: email.id,
            firstName: email.name.givenName,
            lastName: email.name.familyName,
            email: email.emails[0].value,
            thumbnail: email._json.picture
        }).save().then((newUser) => {
            console.log('New User Created' + newUser);
            done(null,newUser);
        });
        }
        });
     })
)