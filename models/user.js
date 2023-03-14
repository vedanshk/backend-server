const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

// model

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// On Save Hook , encrypt password
// Before saving a model , run this function

UserSchema.pre("save", (next) => {
  const user = this;
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }

      user.password = hash;

      next();
    });
  });
});

UserSchema.methods.comparePassword = ( candidatePassword , callback){

    bcrypt.compare(candidatePassword  , this.password , (err , isMatch) =>{

        if(err) { return callback(err);}
        callback(null , isMatch);

    });
}

// model

const User = mongoose.model("user", UserSchema);

module.exports = User;
