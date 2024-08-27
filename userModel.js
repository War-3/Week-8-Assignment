const mongoose = require('mongoose')


const userSchema = new mongoose.Schema(
    {
        name: {type: String, require: true},
        email: {type: String},
        age: {type: Number},
              
    })


const  user = new mongoose.model("user", userSchema)

module.exports = user;


