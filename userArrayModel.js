const mongoose = require('mongoose')


const userSchema = new mongoose.Schema(
    {
        name: {type: String, require: true},
        email: {type: String},
        age: {type: Number},
              
    })

    const userArraySchema = new mongoose.Schema(
        {
            schoolName: {type: String},
            Department:{type: String},
            students:[userSchema]
        });


const  userArray = new mongoose.model('userArray',userArraySchema)


module.exports = userArray

