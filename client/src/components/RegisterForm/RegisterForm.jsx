import React, { useState } from "react";
import styles from "./RegisterForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function RegisterForm() {
  const navigate = useNavigate();
  const [checkBox, setcheckBox] = useState(false);
  const [formData, setformData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const checkboxClick = () => {
    setcheckBox(!checkBox);
  };

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
      !formData.name ||
      !formData.email ||
      !formData.mobile ||
      !formData.password ||
      !checkBox
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
      ) ||
      !isValid(/^[6-9]\d{9}$/, formData.mobile)
    ) {
      toast.error("Please enter a valid Email or Mobile no.", {
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
      axios
        .post(
          `https://job-listing-server-9eo0.onrender.com/api/auth/register`,
          formData
        )
        .then((response) => {
          if (response.status === 200) {
            window.localStorage.setItem("user", response.data.userEmail);
            window.localStorage.setItem(
              "recruiterName",
              response.data.recruiterName
            );
            window.localStorage.setItem("token", response.data.token);
            toast.success("User Registered Successfully!!", {
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
          if (error.response.status === 409) {
            toast.warning(error.response.data, {
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
            toast.error("Something went wrong! Please try again later", {
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
      <h1 className={styles.h1}>Create an account</h1>

      <h3>Your personal job finder is here</h3>

      <input
        type="text"
        placeholder="Name"
        className={styles.inputbox}
        name="name"
        value={formData.name}
        onChange={onChange}
      />

      <input
        type="email"
        placeholder="Email"
        className={styles.inputbox}
        name="email"
        value={formData.email}
        onChange={onChange}
      />

      <input
        type="text"
        placeholder="Mobile"
        className={styles.inputbox}
        name="mobile"
        value={formData.mobile}
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
      <div className={styles.checkbox_content}>
        <input
          type="checkbox"
          style={{ backgroundColor: "#858585" }}
          onClick={checkboxClick}
        />
        <p>
          By creating an account, I agree to our terms of use and privacy policy
        </p>
      </div>
      <button className={styles.accountButton} onClick={handleClick}>
        Create Account
      </button>
      <div className={styles.isSignedin}>
        <p>Already have an account?</p>
        <Link to="/login" style={{ color: "black" }}>
          Sign in
        </Link>
      </div>
    </div>
  );
}

export default RegisterForm;
