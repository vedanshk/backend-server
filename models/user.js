const mongoose = require("mongoose");


const { Schema } =  mongoose;

// model


const UserSchema = new Schema({

    email:  {
        type: String ,
        required: true,
        unique:true,
        lowercase:true

    },
    password :{
        type: String ,
        required: true,

    }


});


// model

 const User = mongoose.model('user' , UserSchema);

 module.exports = User;