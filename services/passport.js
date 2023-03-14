const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const config = require("../config");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

// Setup options for JWT Strategy

const LocalStrategy = require("passport-local");
// 
const localOptions = {usernameField : 'email' }

const localLogin = new LocalStrategy( localOptions , (email , password , done){


 User.findOne({ email} , function(err , user){

    if(err){ return done(err)}

    if(!user) { return done(null , false)};

    // compaere password
    
    bcrypt.comparePassword( password ,  function (err , isMatch) {

        if(err) {

            return done(err);
        }
        if(!isMatch){

            return done(null , false);
        }
        return done(null , user);

    });


 })







});



const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.secret,
};

// Create JWT strategy

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // See if the user Id in the payload exists in our database

  // If it does , call done with that other

  // otherwise , call done without a user object

  User.findById(payload.sub, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (!user) {
      return done(null, false);
    } else {
      return done(null, user);
    }
  });
});

passport.use(jwtLogin);
password.use(localLogin);
