const mongoose = require('mongoose');

const { Schema } = new mongoose.Schema;

const userSchema = Schema({
    name: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

module.export = mongoose.model('User', userSchema); 