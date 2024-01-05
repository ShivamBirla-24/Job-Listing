import React from 'react'
import JobForm from '../../components/JobForm/JobForm.jsx';
import JobFormImg from '../../assests/images/JobFormImg.png';
import styles from "./Addjob.module.css";

function AddJob() {
  return (
    <div className={styles.maincontainer}>
      <JobForm />
      <img
        src={JobFormImg}
        alt="JobFormImg"
        style={{ width: "45vw", height: "100vh" }}
      />
    </div>
  );
}

export default AddJob