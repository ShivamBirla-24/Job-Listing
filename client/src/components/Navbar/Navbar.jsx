import React from 'react'
import styles from './Navbar.module.css'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const recruiterName = localStorage.getItem("recruiterName");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("recruiterName");
    localStorage.removeItem("user");
    navigate("/")
    toast.success("Logout Successfully", {
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
  return (
    <div className={styles.nav_container}>
          <h2>Jobfinder</h2>
          {
              !token ?
                  <div className={styles.buttondiv}>
                      <button className={styles.loginbtn} onClick={()=>{navigate("/login")}}>Login</button>
                      <button className={styles.logoutbtn} onClick={()=>{navigate("/register")}}>Register</button>
                  </div> :
                  <div className={styles.buttondiv}>
                      <button className={styles.logoutbtn} onClick={handleLogout}>Logout</button>
                      <p>Hello! {recruiterName}</p>
                  </div>
          }
    </div>
  );
}

export default Navbar