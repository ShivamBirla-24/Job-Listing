import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './JobForm.module.css';
import { toast } from 'react-toastify';
import axios from 'axios';

function JobForm() {
  const navigate = useNavigate()
  const [jobForm, setjobForm] = useState({
    companyName: "",
    logoUrl: "",
    jobPosition: "",
    salary: "",
    jobType: "",
    remote: "",
    location: "",
    jobDescription: "",
    aboutCompany: "",
    skillsRequired: "",
    information:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setjobForm((prev) => ({
      ...prev,
      [name]:value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const recruiterName = localStorage.getItem("recruiterName");

    if (!token) {
      toast.warning("Please Login First!!", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/login");
      return;
    }

    if (
      !jobForm.companyName ||
      !jobForm.aboutCompany ||
      !jobForm.information ||
      !jobForm.jobDescription ||
      !jobForm.jobPosition ||
      !jobForm.jobType ||
      !jobForm.location ||
      !jobForm.logoUrl ||
      !jobForm.remote ||
      !jobForm.salary ||
      !jobForm.skillsRequired
    ) {
      toast.warning("All the fields are required!!", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    
    try {
      const data = { ...jobForm, recruiterName };
      console.log(data);
      const response = await axios.post(
        "http://localhost:5000/api/job/create",
        data,
        {
          headers: {
            "Content-Type":"application/json",
            "Accept": "application/json",
            "Authorization": token
          }
        }
      );
      if (response.status === 200) {
       toast.success("Job created successfully", {
         position: "top-center",
         autoClose: 4000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
       });
        navigate("/");
      } else {
        toast.error("Something went wrong!!Please try again later", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
     }
    }
    catch (error) {
      console.log(error)
    }

  }
  
  return (
    <div className={styles.main_container}>
      <h1>Add Job Description</h1>
      <div className={styles.inputdivs}>
        <label htmlFor="companyName">Company Name</label>
        <input
          id="companyName"
          name="companyName"
          type="text"
          placeholder="Enter your company name here"
          value={jobForm.companyName}
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputdivs}>
        <label htmlFor="logoUrl">Add LogoUrl</label>
        <input
          id="logoUrl"
          name="logoUrl"
          type="text"
          placeholder="Enter the link"
          value={jobForm.logoUrl}
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputdivs}>
        <label htmlFor="jobPosition">Job Position</label>
        <input
          id="jobPosition"
          name="jobPosition"
          type="text"
          placeholder="Enter Job Position"
          value={jobForm.jobPosition}
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputdivs}>
        <label htmlFor="salary">Monthly Salary</label>
        <input
          id="salary"
          name="salary"
          type="text"
          placeholder="Enter amount in rupees"
          value={jobForm.salary}
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputdivs}>
        <label htmlFor="jobType">Job Type</label>
        <select name="jobType" id="jobType" value={jobForm.jobType} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Internship">Internship</option>
        </select>
      </div>
      <div className={styles.inputdivs}>
        <label htmlFor="remote">Remote/Office</label>
        <select name="remote" id="remote" value={jobForm.remote} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Remote">Remote</option>
          <option value="Office">Office</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>
      <div className={styles.inputdivs}>
        <label htmlFor="location">Location</label>
        <input
          type="text"
          name="location"
          id="location"
          placeholder="Enter Location"
          value={jobForm.location}
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputdivs}>
        <label htmlFor="jobDescription">Job Description</label>
        <textarea
          name="jobDescription"
          id="jobDescription"
          placeholder="Type Job Description"
          value={jobForm.jobDescription}
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputdivs}>
        <label htmlFor="aboutCompany">About Company</label>
        <textarea
          name="aboutCompany"
          id="aboutCompany"
          placeholder="Type About Company"
          value={jobForm.aboutCompany}
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputdivs}>
        <label htmlFor="skillsRequired">Skills Required</label>
        <input
          type="text"
          name="skillsRequired"
          id="skillsRequired"
          placeholder="Enter the must have skills"
          value={jobForm.skillsRequired}
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputdivs}>
        <label htmlFor="information">Information</label>
        <input
          type="text"
          name="information"
          id="information"
          placeholder="Enter the additional information"
          value={jobForm.information}
          onChange={handleChange}
        />
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.cancelbtn} onClick={()=>{navigate("/job-posts")}}>Cancel</button>
        <button className={styles.addbtn} onClick={handleSubmit}>+ Add Job</button>
      </div>
    </div>
  );
}

export default JobForm