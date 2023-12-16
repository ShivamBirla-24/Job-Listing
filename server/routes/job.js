const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')


const router = express.Router()

//Importing Middleware
const isLoggedin = require('../middlewares/requireauth')

dotenv.config()


//Job collection from database 
const JobDetails = require('../db_models/jobDetails')

//Job route

//Creating Job (post method)

router.post('/create', isLoggedin ,async(req, res) => {
    try {
        // extracting all the fields from req body
        const { companyName, logoURL  , jobPosition , salary , jobType , remote , location ,jobDescription , aboutCompany , skillsRequired , information} = req.body; 
        
        //checking for all the fields are filled
        if (!companyName || !logoURL || !jobPosition || !salary|| !jobType || !remote || !location || !jobDescription || !aboutCompany || !skillsRequired || !information) {
            
            return res.status(400).json({
                message : "All the fields are required"
            })
        }
        
        const skills = [];

        if (typeof skillsRequired === 'string') {
            skills = skillsRequired.split(",").map(skillsRequired.trim());
        }
        //creating the job entry in the database 
        await JobDetails.create( { companyName, logoURL  , jobPosition , salary , jobType , remote , location ,jobDescription , aboutCompany , skillsRequired : skills , information})
        
        res.status(200).json({
            message: "Job created successfully"
        })
    }
    catch (error) {
        console.log(error)
        res.json({ error: 'Internal Server Error' });;
    }
})

//api for editing the job
router.patch('/edit/:jobId', isLoggedin, async (req, res) => {
    try {
        const {jobId} = req.params
        
        //checking id is valid mongoose object id or not
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        
        const { companyName, logoURL, jobPosition, salary, jobType, remote, location, jobDescription, aboutCompany, skillsRequired, information } = req.body;

        const updatedJob = {}
        
        if (companyName) {
            updatedJob.companyName = companyName
        }

        if (logoURL) {
            updatedJob.logoURL = logoURL
        }

        if (jobPosition) {
            updatedJob.jobPosition = jobPosition
        }

        if (salary) {
            updatedJob.salary = salary
        }
        
        if (jobType) {
            updatedJob.jobType = jobType
        }

        if (remote) {
            updatedJob.remote = remote
         }
        
        if (location) {
            updatedJob.location = location
        }

        if (jobDescription) {
            updatedJob.jobDescription = jobDescription
        }

        if (aboutCompany) {
            updatedJob.aboutCompany = aboutCompany
        }

        if (skillsRequired) {
            const skills = skillsRequired.split(',').map(skillsRequire => skillsRequire.trim())
            updatedJob.skillsRequired = skills
        }

        if (information) {
            updatedJob.information = information
        }
        
        JobDetails.findByIdAndUpdate(jobId, updatedJob , {new : true , runValidators : true}).exec()
            .then((editedJob) => {
                if (!editedJob) {
                    return res.status(404).json({
                        message : "User Not Found!"
                    })
                }
                console.log(editedJob)
                res.status(200).json({
                    message: "Job Updated Successfully"
                })
            })
            .catch((error) => {
                res.status(401).json({
                    message: "Validation Error",
                    error : error.message
                })
        })
         }
    catch (error) {
        res.status(500).json({
            error,
            message: "Internal Server Error"
        })
    }
})

//api to list all the jobs with filters based on skills and jobPosition

router.get('/posts', async (req, res) => {
    const { jobPosition, skillsRequired } = req.body;
  
    try {
      let query = {};
  
      if (jobPosition) {
        query.jobPosition = jobPosition;
      }
  
      if (skillsRequired) {
        query.skillsRequired = { $in: skillsRequired.split(',') };
      }
      console.log(query)
        const jobPosts = await JobDetails.find(query).sort({ createdAt: -1 });
      console.log(jobPosts)
      return res.json({ jobPosts });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

// api to get job posts detail
router.get('/posts/:id', async (req, res) => {
    const jobId = req.params.id;
  
    try {
      const jobPost = await JobDetails.findById(jobId);
  
      if (!jobPost) {
        return res.status(404).json({ message: 'Job post not found' });
      }
  
      return res.json({ jobPost });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
module.exports = router
