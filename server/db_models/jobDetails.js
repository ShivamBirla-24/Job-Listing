const mongoose = require("mongoose");

const jobdetailSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },

  companyName: { type: String, required: true },

  logoURL: {
    type: String,
    required: true,
  },
  
  jobPosition: {
    type: String,
    required: true,
  },

  salary: {
    type: String,
    required: true,
  },

  jobType: {
    type: String,
    enum: ["Full Time", "Part Time"],
    required: true,
  },

  remote: { type: String, enum: ["Remote", "Office"], required: true },

  location: {
    type: String,
    required: true,
  },

  jobDescription: {
    type: String,
    required: true,
  },

  aboutCompany: {
    type: String,
    required: true,
  },
  
  skillsRequired: {
    type: [String],
    required: true,
  },

  information: { type: String, required: true },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("JobDetail", jobdetailSchema);
