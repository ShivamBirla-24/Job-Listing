const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const router = express.Router()

const errorHandler = require('../middlewares/errorHandler')

dotenv.config()

//User Collection from data base 
const User = require('../db_models/user')

//Register Route
router.post('/register', async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body

        //Checking all the fields are mandatory
        if (!name || !email || !mobile || !password) {
            return res.status(400).json('All fields are required')
        }
        
        //mongoose method to find the user with unique email
        const userExists = await User.findOne({ email })
        
        //Checking if user already exists
        if (userExists) {
            return res.status(409).json('User already registered')
        }
        
        //encrypted password to store in db 

        const encPassword = await bcrypt.hash(password,10)

        //creating the user filled data when user is not present
        User.create({ name, email, mobile, password: encPassword })

        //return success message 
        res.json({
            success: true,
            msg: "Sign up successfully"
        })
        
    } catch (error) {
        errorHandler(res,error)
    }
})

//Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        //if anyone of the field is empty then return 
        if (!email || !password) {
            return res.status(400).json({
                message: 'All fields are requires'
            })
        }

        //finding the data with the help of email user entered
        const user = await User.findOne({ email })
        
        //if user not present 
        if (!user) {
            return res.status(401).json({
                message: "Please Sign up first"
            })
        }
        
        //if user present then checking the password is correct or not 
        const passMatched = await bcrypt.compare(password, user.password);
        
        //if password is not correct
        if (!passMatched) {
            return res.status(401).json({
                message: "Please enter correct password"
            })
        }

        //token generated
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY)
        
        //sending response after successfull login

        res.status(200).json({
            message: "Logged in successfully",
            token
        })
    }
    catch (error) {
        errorHandler(res, error)
    }
});

module.exports = router