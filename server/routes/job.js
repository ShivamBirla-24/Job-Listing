const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')


const router = express.Router()

//Importing Middleware
const isLoggedin = require('../middlewares/requireauth')

dotenv.config()

//using the middlewares
router.use('/job',isLoggedin)


//Job collection from database 
const JobDetails = require('../db_models/jobDetails')


//Job route

//Creating Job (post method)
router.post('/job', isLoggedin ,async(req, res) => {
    try {
        // extracting all the fields from req body
        const { companyName, logoURL  , jobPosition , salary , jobType , remote , location ,jobDescription , aboutCompany , skillsRequired , information} = req.body; 
        
        //checking for all the fields are filled
        if (!companyName || !logoURL || !jobPosition || !salary|| !jobType || !remote || !location || !jobDescription || !aboutCompany || !skillsRequired || !information) {
            
            return res.status(400).json({
                message : "All the fields are required"
            })
        }
        
        //creating the job entry in the database 
        await JobDetails.create( { companyName, logoURL  , jobPosition , salary , jobType , remote , location ,jobDescription , aboutCompany , skillsRequired , information})
        
        res.status(200).json({
            message: "Job created successfully"
        })
    }
    catch (error) {
        console.log(error)
        res.json({ error: 'Internal Server Error' });;
    }
})

module.exports = router
