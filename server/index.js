const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

//Importing Routes
const authRoutes = require('./routes/auth')
const jobRoutes = require('./routes/job')

dotenv.config()

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Register route
app.use(authRoutes)

//job route(protected route)
app.use(jobRoutes)

app.get('/', (req, res) => {
    res.json("Server is running")
})


app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
        console.log('Server is running')
        })
        .catch((error) => {
            console.log(error);
        })
})