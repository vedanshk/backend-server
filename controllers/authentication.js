const jwt = require("jwt-simple");
const config = require("../config");

const tokenForUser = (user) => {
    const timeStamp = new Date().getTime();
  return jwt.encode({ sub: user.id  , iat: timeStamp}, config.secret);
};



const User = require("../models/user");

exports.signup = (req, res, next) => {
  const { email, password } = req.body;

  // See if a user with the give email exists

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: " You must provide email and password" });
  }

  User.find({ email }, function (err, existingUser) {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      //If a user with email does exist , return a error
      return res.status(422).send({ error: "Email is in use " });
    }

    // If a user with email does exists create and save user record

    const user = new User({
      email,
      password,
    });
    user.save(function (err) {
      if (err) {
        return next(err);
      }
          res.json({ token: tokenForUser(user) });
    });

  });

  // Resposne to request indication the user was created
};

exports.signIn =( req , res , next) =>{

    const user = req.user;

    res.send({ token : tokenForUser(user)});



    // user has already had their email and password auth'd

    // We just need to give them a token




};
