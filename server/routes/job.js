const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const router = express.Router();

//Importing Middleware
const isLoggedin = require("../middlewares/requireauth");

dotenv.config();

//Job collection from database
const JobDetails = require("../db_models/jobDetails");

//Job route

//Creating Job (post method)

router.post("/create", isLoggedin, async (req, res) => {
  try {
    // extracting all the fields from req body
    const {
      companyName,
      logoUrl,
      jobPosition,
      salary,
      jobType,
      remote,
      location,
      jobDescription,
      aboutCompany,
      skillsRequired,
      information,
      recruiterName,
    } = req.body;
    //checking for all the fields are filled
    if (
      !companyName ||
      !logoUrl ||
      !jobPosition ||
      !salary ||
      !jobType ||
      !remote ||
      !location ||
      !jobDescription ||
      !aboutCompany ||
      !skillsRequired ||
      !information ||
      !recruiterName
    ) {
      return res.status(400).json({
        message: "All the fields are required",
      });
    }

    let skills = [];

    if (typeof skillsRequired === "string") {
      skills = skillsRequired
        .split(",")
        .map((skillsRequired) => skillsRequired.trim().toLowerCase())
    }
    //creating the job entry in the database
    await JobDetails.create({
      companyName,
      logoUrl,
      jobPosition:jobPosition.toLowerCase(),
      salary,
      jobType,
      remote,
      location,
      jobDescription,
      aboutCompany,
      skillsRequired: skills,
      information,
      recruiterName,
    });

    res.status(200).json({
      message: "Job created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//api for editing the job
router.put("/edit/:jobId", isLoggedin, async (req, res) => {
  try {
    const { jobId } = req.params;

    //checking id is valid mongoose object id or not
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const {
      companyName,
      logoURL,
      jobPosition,
      salary,
      jobType,
      remote,
      location,
      jobDescription,
      aboutCompany,
      skillsRequired,
      information,
      recruiterName,
    } = req.body;

    const updatedJob = {};

    if (companyName) {
      updatedJob.companyName = companyName;
    }

    if (logoURL) {
      updatedJob.logoURL = logoURL;
    }

    if (jobPosition) {
      updatedJob.jobPosition = jobPosition;
    }

    if (salary) {
      updatedJob.salary = salary;
    }

    if (jobType) {
      updatedJob.jobType = jobType;
    }

    if (remote) {
      updatedJob.remote = remote;
    }

    if (location) {
      updatedJob.location = location;
    }

    if (jobDescription) {
      updatedJob.jobDescription = jobDescription;
    }

    if (aboutCompany) {
      updatedJob.aboutCompany = aboutCompany;
    }

    if (skillsRequired) {
      const skills = skillsRequired
        .split(",")
        .map((skillsRequire) => skillsRequire.trim());
      updatedJob.skillsRequired = skills;
    }

    if (information) {
      updatedJob.information = information;
    }

    if (recruiterName) {
      updatedJob.recruiterName = recruiterName;
    }

    JobDetails.findByIdAndUpdate(jobId, updatedJob, {
      new: true,
      runValidators: true,
    })
      .exec()
      .then((editedJob) => {
        if (!editedJob) {
          return res.status(404).json({
            message: "User Not Found!",
          });
        }
        console.log(editedJob);
        res.status(200).json({
          message: "Job Updated Successfully",
        });
      })
      .catch((error) => {
        res.status(401).json({
          message: "Validation Error",
          error: error.message,
        });
      });
  } catch (error) {
    res.status(500).json({
      error,
      message: "Internal Server Error",
    });
  }
});

//api to list all the jobs with filters based on skills and jobPosition

router.get("/posts", async (req, res) => {
  const { jobPosition, skillsRequired } = req.query;
  try {
    let query = {};
    
    if (jobPosition) {
      query.jobPosition = jobPosition.toLocaleLowerCase(); // query => {jobPosition : "Frontend"}
    }
    
    if (skillsRequired) {
      query.skillsRequired = { $in : skillsRequired.split(",").map((skill)=> skill.trim().toLocaleLowerCase())};
    }
    const jobPosts = await JobDetails.find(query).sort({ createdAt: -1 });
    return res.status(200).json(jobPosts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" })
  }
});

// api to get job posts detail
router.get("/posts/:id", async (req, res) => {
  const jobId = req.params.id;

  try {
    const jobPost = await JobDetails.findById(jobId);

    if (!jobPost) {
      return res.status(404).json({ message: "Job post not found" });
    }

    return res.status(200).json({ jobPost });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
