const mongoose = require('mongoose');
const User_Schema = new mongoose.Schema({
    name:{type:String,required:true},
    location:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    date:{type:Date,default:Date.now}
});
const User = mongoose.model('User' , User_Schema);
module.exports = User;