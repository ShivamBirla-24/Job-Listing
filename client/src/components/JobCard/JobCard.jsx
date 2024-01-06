import React from 'react'
import styles from './JobCard.module.css';
import { useNavigate } from 'react-router-dom';

function JobCard({ data }) {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
  return (
    <div className={styles.main_card}>
      <div className={styles.left_container}>
        <img
          src={data.logoUrl}
          alt="company logo"
          style={{ height: "70px", width: "50px", paddingTop: "4.5%" }}
        />
        <div className={styles.details_container}>
          <p
            style={{ color: "#000000", fontWeight: "500" }}
          >
            {data.jobPosition.toUpperCase()}
          </p>
          <div className={styles.salarydetails}>
            <span>&#x20B9; {data.salary}/Month</span>
            <span>City: {data.location}</span>
            <span>Country: India</span>
          </div>
          <div className={styles.remote}>
            <span>{data.remote}</span>
            <span>{data.jobType}</span>
          </div>
        </div>
      </div>

      <div className={styles.right_container}>
        <div className={styles.skills}>
            {data.skillsRequired.map((item) => {
                return (
                   <span key={item}>{item.charAt(0).toUpperCase()+item.slice(1)}</span>
              )
          })}
        </div>
        <div className={styles.button_container}>
                  {token ? <button className={styles.edit} onClick={() => navigate('/add-job',
                      { state: { id: data._id , edit:true} })}>
                      Edit Job
                  </button> : <></>}
                  <button className={styles.viewdetail} onClick={() => navigate('/job-detail', {
              state:{id:data._id}
          })}>View Details</button>
        </div>
      </div>
    </div>
  );
}

export default JobCard;