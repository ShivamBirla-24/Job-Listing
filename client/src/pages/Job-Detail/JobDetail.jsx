import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import styles from "./JobDetail.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

function JobDetail() {
  const [job, setJob] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { id } = state;
  const token = localStorage.getItem("token");
  useEffect(() => {

    axios.get(`http://localhost:5000/api/job/posts/${id}`)
      .then((response) => {
        let data = response.data.jobPost;
        data = {...data,jobPosition:data.jobPosition.toUpperCase()}
        setJob({ ...data})
      })
      .catch((error) => console.log(error))
      
  },[])
  
  return (
    <div className={styles.main_container}>
      <Navbar />
      <div className={styles.display_container}>
        <div className={styles.top_container}>
          {job.jobPosition} work from {job.remote} {job.jobType} job at{" "}
          {job.companyName}
        </div>
        <div className={styles.bottom_container}>
          <div className={styles.jobpositiondiv}>
            <p style={{ color: "#999999" }}>{job.jobType}</p>
            <div className={styles.position_heading}>
              <h1 style={{ margin: "0", padding: "0" }}>{job.jobPosition}</h1>
              <p style={{ color: "#ED5353" }}>{job.location} | India</p>
            </div>
            <div className={styles.salary}>
              <p style={{ color: "#999999", fontWeight: "600" }}>Stipend</p>
              <p>Rs {job.salary}/month</p>
            </div>
            {token ? <button onClick={()=>{navigate("/add-job",{state:{edit:true,id:job._id}})}}>Edit Job</button> : ""}
          </div>
          <div className={styles.content_container}>
            <p>About company</p>
            <span>{job.aboutCompany}</span>
          </div>
          <div className={styles.content_container}>
            <p>About the job/internship</p>
            <span>{job.jobDescription}</span>
          </div>
          <div className={styles.skills_container}>
            <p>Skill(s) required</p>
            <div>
              {job.skillsRequired && job.skillsRequired.map((skill) => {
                return (
                  <span className={styles.skill} key={skill}>
                    {skill.charAt(0).toUpperCase()+skill.slice(1)}
                  </span>
                );
              })}
            </div>
          </div>
          <div className={styles.content_container}>
            <p>Additional Information</p>
            <span>
              {job.information}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetail;
