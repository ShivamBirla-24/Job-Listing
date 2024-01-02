import React from "react";
import RegisterForm from "../../components/RegisterForm/RegisterForm.jsx";
import styles from "./Register.module.css";
import backgroundImg from "../../assests/images/RegisterPage.png";

function Register() {
  return (
    <div className={styles.main_container}>
      <RegisterForm />
      <img
        src={backgroundImg}
        alt="backgroundImage"
        style={{
          height: "100vh",
          width: "40vw",
          position: "absolute",
          top: "0",
          right: "0",
        }}
      />
      <h1
        style={{
          fontFamily: "sans-serif",
          color: "white",
          position: "absolute",
          top: "10%",
          left: "80%",
          transform: "translate(-50%,-50%)",
          textAlign: "center",
          width: "500px",
        }}
      >
        Your Personal Job Finder
      </h1>
    </div>
  );
}

export default Register;
