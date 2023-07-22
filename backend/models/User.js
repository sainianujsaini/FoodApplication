const mongoose = require('mongoose');
const User_Schema = new mongoose.Schema({
    name:{type:String,required:true},
    location:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},

    //this is the default type of saving date with current date
    date:{type:Date,default:Date.now}
});

// common way of defining the User using User_Schema
const User = mongoose.model('User' , User_Schema);

//exporting it
module.exports = User;