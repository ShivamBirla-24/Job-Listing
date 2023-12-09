const mongoose = require('mongoose');

const { Schema } = new mongoose.Schema;

const jobdetailSchema = Schema({
    companyName: {
        type: String,
        required: true
    },
    logoUrl: {
        type: String,
        required : true
    },
    jobPosition: {
        type: String,
        required: true
    },
    monthlySalary: {
        type: Number,
        required : true
    },
    jobType: {
        type: Boolean,
        required: true
    },
    remoteOffice: {
        type: Boolean,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    aboutCompany: {
        type: String,
        required: true
    },
    skills: {
        type: Array,
        required: true
    },
    info: {
        type: String,
        required: true
    }
})

module.export = mongoose.model('User', jobdetailSchema); 