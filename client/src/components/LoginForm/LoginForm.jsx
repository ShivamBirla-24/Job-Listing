import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function LoginForm() {
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    email: "",
    password: ""
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };

  const isValid = (regex, string) => {
    const check = regex.test(string);
    return check;
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (
      !formData.email ||
      !formData.password
    ) {
      toast.error("All the fields are required!!", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (
      !isValid(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        formData.email
      )
    ) {
      toast.error("Please enter a valid Email", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      console.log(process.env.REACT_APP_API_URL);
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/auth/login`, formData)
        .then((response) => {
          if (response.status === 200) {
            window.localStorage.setItem("user", response.data.user);
            window.localStorage.setItem(
              "recruiterName",
              response.data.recruiterName
            );
            window.localStorage.setItem("token", response.data.token);
            toast.success(response.data.message, {
              position: "top-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            navigate("/job-posts");
          }
        })
        .catch((error) => {
          const response = error.response;
          if (response.status === 403) {
            toast.warning(response.data.message, {
              position: "top-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else if (response.status === 401) {
            toast.warning(response.data.message, {
              position: "top-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else {
            toast.error("Something went wrong!! Please try again later", {
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
        });
    }
  };

  return (
    <div className={styles.main_container}>
      <h1 className={styles.h1}>Already have an account?</h1>

      <h3>Your personal job finder is here</h3>

      <input
        type="email"
        placeholder="Email"
        className={styles.inputbox}
        name="email"
        value={formData.email}
        onChange={onChange}
      />

      <input
        type="password"
        placeholder="Password"
        className={styles.inputbox}
        name="password"
        value={formData.password}
        onChange={onChange}
      />
      <button className={styles.accountButton} onClick={handleClick}>
        Sign In
      </button>
      <div className={styles.isSignedin}>
        <p>Don’t have an account?</p>
        <Link to="/register" style={{ color: "black" }}>
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
