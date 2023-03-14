const passport = require("passport");
const Authentication = require("./controllers/authentication");
const passportService = require("./services/passport");
const passport = require('passport');
const requireAuth = passport.authenticate("jwt", { session: false });

const requireSignin = passport.authenticate('local' , {session : false});


module.exports = (app) => {
  app.post("/signup", Authentication.signup);
  app.post("/signIn" , requireSignin ,  Authentication.signIn);
  app.get("/" , requireAuth , (req ,res , next)=>{


  });
};
