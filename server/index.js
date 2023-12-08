const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.get('/', (req, res) => {
    res.send("hello")
})

app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
        console.log('Server created succssfully')
        })
        .catch((error) => {
            console.log(error);
        })
})