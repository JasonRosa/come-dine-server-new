const { Schema, model } = require("mongoose");


const userSchema = new Schema(
  {
    "username": { type: String, required: true, unique: true }, 
    "email": { type: String },
    "password": { type: String, required: true},
    "firstName": String,
    "lastName": String,
    "contact": String,
    "city": { type: String },
    "host": Boolean,
    "imgUrl": String,
    "description": String,
    
 
 }
);

const User = model("User", userSchema);

module.exports = User;
