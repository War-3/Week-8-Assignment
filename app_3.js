const express = require('express')

const app = express()
const mongoose = require('mongoose')

const dotenv = require("dotenv").config()

const userArray = require('./userArrayModel')
const user = require('./userModel')



app.use(express.json())


const PORT = process.env.PORT || 9000

mongoose.connect(`${process.env.MONGODB_UL}`)

    .then(() => console.log("Mongoose connected..."))



app.listen(PORT, () => {
    console.log('Server is running on', PORT)
})


app.post('/add_user', async (req, res) => {
    const { name, email, age } = req.body



    if (name.length < 3) {
        return res.status(400).json({
            message: "Error: minimium of 3 character for name required"
        })
    }

    const alreadyexist = await user.findOne({ email })


    if (alreadyexist) {
        return res.status(400).json({
            message: "This user exist!"
        })
    }

    const newUser = new user({ name, email, age })

    await newUser.save()
    return res.status(200).json({ message: "Registration Successful", newUser })
})


app.post('/update_email', async (req, res) => {
    const { name, updatedEmail } = req.body
    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailCheck.test(updatedEmail)) {
        return res.status(400).json({
            message: "invalide email"
        })
    }
    const container = await user.findOneAndUpdate({ name: name }, { email: updatedEmail }, { returnDocument: 'After' })
    if (container) {
        return res.status(200).json({ message: 'Email updated successfully!'});
    } else {
        return res.status(404).json({ message: 'User not found!' });
    }
})




app.post('/add_users', async (req, res) => {

    const { schoolName, Department, students } = req.body

    if (students[0].age < 18 || students[0].age > 99) {
        return res.status(400).json({
            message: "Error. Please make sure you're within age range 18years old and 99 years old"
        })
    }

    const newUser = new userArray({ schoolName, Department, students })

    await newUser.save()
    return res.status(200).json({ message: "Registration Successful", newUser })


})

